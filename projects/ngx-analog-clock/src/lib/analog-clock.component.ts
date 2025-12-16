import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, signal, computed, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockTheme, ClockCustomColors, DigitalDisplayConfig, AnalogClockConfig, HandConfig, DisplayConfig, LabelConfig, } from './analog-clock.interface';

interface Position {
	x: number;
	y: number;
}

interface MarkerCoords {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

@Component({
	selector: 'ngx-analog-clock',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './analog-clock.component.html',
	styleUrl: './analog-clock.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalogClockComponent implements OnInit, OnDestroy, OnChanges {

	constructor() {}

	secondHandTailPosition = computed(() => {
		const angle = this.secondAngle();
		const tailLength = 0.2;
		return {
			x: this.center() - Math.cos(angle) * this.radius() * tailLength,
			y: this.center() - Math.sin(angle) * this.radius() * tailLength
		};
	});

	@Input() size: number = 200;
	@Input() theme: ClockTheme = 'light';
	@Input() timezone: string = 'local';
	@Input() time?: Date;
	@Input() customClass?: string;

	@Input() hands: HandConfig = {};
	@Input() display: DisplayConfig = {};
	@Input() customColors?: ClockCustomColors;
	@Input() label?: LabelConfig;
	@Input() digitalDisplay?: DigitalDisplayConfig;

	@Input() set config(value: Partial<AnalogClockConfig>) {
		if (!value) return;

		const prevSmooth = this.hands.smooth;

		if (value.size !== undefined) this.size = value.size;
		if (value.theme !== undefined) this.theme = value.theme;
		if (value.timezone !== undefined) this.timezone = value.timezone;
		if (value.time !== undefined) this.time = value.time;
		if (value.customColors !== undefined) this.customColors = value.customColors;
		if (value.customClass !== undefined) this.customClass = value.customClass;

		if (value.hands) this.hands = { ...this.hands, ...value.hands };
		if (value.display) this.display = { ...this.display, ...value.display };
		if (value.label) this.label = value.label;
		if (value.digitalDisplay) this.digitalDisplay = value.digitalDisplay;

		this.validateInputs();

		if (prevSmooth !== this.hands.smooth && !this.time) {
			this.restartAnimation();
		}
	}

	@Output() tick = new EventEmitter<Date>();
	@Output() hourChange = new EventEmitter<number>();

	private sizeSignal = signal(200);
	private baseTime = signal(new Date());
	private animationTime = signal(Date.now());
	private timezoneOffset = signal(0);
	private lastEmittedHour?: number;
	private animationFrameId?: number;
	private timeUpdateInterval?: any;

	private currentTime = computed(() => {
		const offset = this.timezoneOffset();
		const now = this.animationTime();

		if (this.effectiveSmoothHands()) {
			return new Date(now + offset);
		} else {
			return this.baseTime();
		}
	});

	displayHourMarkers = computed(() => [1, 2, 4, 5, 7, 8, 10, 11]);
	cardinalMarkers = computed(() => [0, 3, 6, 9]);
	displayNumbers = computed(() => Array.from({ length: 12 }, (_, i) => i));
	minutes = computed(() => 
		this.isSmall() ? [] : 
		Array.from({ length: 60 }, (_, i) => i).filter(m => m % 5 !== 0)
	);

	center = computed(() => this.sizeSignal() / 2);
	radius = computed(() => {
		const baseRadius = this.sizeSignal() / 2;
		const hasNumbers = this.effectiveMarkers() === 'numbers' || this.effectiveMarkers() === 'lines-numbers';
		return baseRadius - (hasNumbers ? 15 : 10);
	});

	isSmall = computed(() => this.sizeSignal() <= 150);
	isMedium = computed(() => this.sizeSignal() > 150 && this.sizeSignal() <= 250);

	private hourAngle = computed(() => {
		const time = this.currentTime();
		const hours = time.getHours() % 12;
		const minutes = time.getMinutes();

		return ((hours + minutes / 60) * 30 - 90) * (Math.PI / 180);
	});

	private minuteAngle = computed(() => {
		const time = this.currentTime();
		const minutes = time.getMinutes();

		if (this.effectiveSmoothHands()) {
			const seconds = time.getSeconds();
			return ((minutes + seconds / 60) * 6 - 90) * (Math.PI / 180);
		}
		return (minutes * 6 - 90) * (Math.PI / 180);
	});

	private secondAngle = computed(() => {
		const time = this.currentTime();
		const seconds = time.getSeconds();

		if (this.effectiveSmoothHands()) {
			const ms = time.getMilliseconds();
			return ((seconds + ms / 1000) * 6 - 90) * (Math.PI / 180);
		}
		return (seconds * 6 - 90) * (Math.PI / 180);
	});

	private getHandPosition(angle: number, length: number): Position {
		return {
			x: this.center() + Math.cos(angle) * this.radius() * length,
			y: this.center() + Math.sin(angle) * this.radius() * length
		};
	}

	hourHandPosition = computed(() => 
	this.getHandPosition(this.hourAngle(), this.effectiveHourHandLength()));
	minuteHandPosition = computed(() => 
	this.getHandPosition(this.minuteAngle(), this.effectiveMinuteHandLength()));
	secondHandPosition = computed(() => 
	this.getHandPosition(this.secondAngle(), this.effectiveSecondHandLength()));

	hourHandX = () => this.hourHandPosition().x;
	hourHandY = () => this.hourHandPosition().y;
	minuteHandX = () => this.minuteHandPosition().x;
	minuteHandY = () => this.minuteHandPosition().y;
	secondHandX = () => this.secondHandPosition().x;
	secondHandY = () => this.secondHandPosition().y;
	secondHandTailX = () => this.secondHandTailPosition().x;
	secondHandTailY = () => this.secondHandTailPosition().y;
	secondAngleValue = () => this.secondAngle();

	private getMarkerCoords(index: number, isHour: boolean): MarkerCoords {
		const angle = (index * (isHour ? 30 : 6) - 90) * (Math.PI / 180);
		const outerLength = isHour ? 0.85 : 0.95;
		const center = this.center();
		const radius = this.radius();

		return {
			x1: center + Math.cos(angle) * radius * outerLength,
			y1: center + Math.sin(angle) * radius * outerLength,
			x2: center + Math.cos(angle) * radius,
			y2: center + Math.sin(angle) * radius
		};
	}

	getMarkerX1 = (index: number, isHour: boolean) => this.getMarkerCoords(index, isHour).x1;
	getMarkerY1 = (index: number, isHour: boolean) => this.getMarkerCoords(index, isHour).y1;
	getMarkerX2 = (index: number, isHour: boolean) => this.getMarkerCoords(index, isHour).x2;
	getMarkerY2 = (index: number, isHour: boolean) => this.getMarkerCoords(index, isHour).y2;

	// Dot marker position calculation
	private getDotPosition(index: number, isHour: boolean): Position {
		const angle = (index * (isHour ? 30 : 6) - 90) * (Math.PI / 180);
		const positionMultiplier = 0.92;
		const center = this.center();
		const radius = this.radius();

		return {
			x: center + Math.cos(angle) * radius * positionMultiplier,
			y: center + Math.sin(angle) * radius * positionMultiplier
		};
	}

	getDotX = (index: number, isHour: boolean) => this.getDotPosition(index, isHour).x;
	getDotY = (index: number, isHour: boolean) => this.getDotPosition(index, isHour).y;


	getNumberX(hour: number): number {
		const angle = (hour * 30 - 90) * (Math.PI / 180);
		return this.center() + Math.cos(angle) * this.radius() * this.numberPositionMultiplier();
	}

	getNumberY(hour: number): number {
		const angle = (hour * 30 - 90) * (Math.PI / 180);
		return this.center() + Math.sin(angle) * this.radius() * this.numberPositionMultiplier();
	}

	private validateHandLength(length: number | undefined, defaultValue: number): number {
		if (length === undefined) return defaultValue;
		return Math.min(Math.max(length, 0), 1);
	}

	private validateHandWidth(width: number | undefined, min: number, max: number, defaultValue: number): number {
		if (width === undefined) return defaultValue;
		return Math.min(Math.max(width, min), max);
	}

	effectiveShowHour = () => this.hands.hour?.show ?? true;
	effectiveShowMinute = () => this.hands.minute?.show ?? true;
	effectiveShowSecond = () => this.hands.second?.show ?? true;
	effectiveSmoothHands = () => this.hands.smooth ?? true;
	effectiveMarkers = () => this.display.markers ?? 'lines';
	effectiveShowBorder = () => {
		if (this.display.showBorder !== undefined) {
			return this.display.showBorder;
		}
		return false;
	};
	effectiveShowInnerRing = () => this.display.showInnerRing ?? false;
	effectiveShowCenterRing = () => this.display.showCenterRing ?? false;
	effectiveNumberStyle = () => this.display.numberStyle ?? 'arabic';
	effectiveLabelText = () => this.label?.text;
	effectiveLabelPosition = () => this.label?.position ?? 'top';

	effectiveHourHandLength = () => {
		const length = this.hands.hour?.length ?? 0.55;
		return this.validateHandLength(length, 0.55);
	};

	effectiveMinuteHandLength = () => {
		const length = this.hands.minute?.length ?? 0.7;
		return this.validateHandLength(length, 0.7);
	};

	effectiveSecondHandLength = () => {
		const length = this.hands.second?.length ?? 0.8;
		return this.validateHandLength(length, 0.8);
	};

	private getResponsiveHourWidth(): number {
		return 6;
	}

	private getResponsiveMinuteWidth(): number {
		return 6;
	}

	private getResponsiveSecondWidth(): number {
		return 4;
	}

	hourHandWidth(): number {
		const width = this.hands.hour?.width;
		const defaultWidth = this.getResponsiveHourWidth();
		return this.validateHandWidth(width, 2, 15, defaultWidth);
	}

	minuteHandWidth(): number {
		const width = this.hands.minute?.width;
		const defaultWidth = this.getResponsiveMinuteWidth();
		return this.validateHandWidth(width, 1, 10, defaultWidth);
	}

	secondHandWidth(): number {
		const width = this.hands.second?.width;
		const defaultWidth = this.getResponsiveSecondWidth();
		return this.validateHandWidth(width, 1, 5, defaultWidth);
	}

	hourMarkerWidth(): number {
		const customWidth = this.display.hourMarkerWidth;

		if (customWidth !== undefined) {
			return Math.min(Math.max(customWidth, 1), 10);
		}

		return 3;
	}

	minuteMarkerWidth(): number {
		const customWidth = this.display.minuteMarkerWidth;

		if (customWidth !== undefined) {
			return Math.min(Math.max(customWidth, 0), 5);
		}

		return 1;
	}

	// Dot radius - uses hourMarkerWidth/minuteMarkerWidth for consistency
	hourDotRadius(): number {
		const customSize = this.display.hourMarkerWidth;

		if (customSize !== undefined) {
			return Math.min(Math.max(customSize, 1), 8);
		}

		if (this.isSmall()) return 2;
		if (this.isMedium()) return 3;
		return 4;
	}

	minuteDotRadius(): number {
		const customSize = this.display.minuteMarkerWidth;

		if (customSize !== undefined) {
			return Math.min(Math.max(customSize, 0.5), 4);
		}

		if (this.isSmall()) return 0;
		if (this.isMedium()) return 1;
		return 1.5;
	}


	numberFontSize(): number {
		const customSize = this.display.numberSize;
		const markers = this.effectiveMarkers();

		let defaultSize: number;

		if (markers === 'numbers') {
			if (this.isSmall()) defaultSize = 12;
			else if (this.isMedium()) defaultSize = 16;
			else defaultSize = 20;
		} else {
			if (this.isSmall()) defaultSize = 10;
			else if (this.isMedium()) defaultSize = 14;
			else defaultSize = 16;
		}

		if (customSize !== undefined) {
			return Math.min(Math.max(customSize, 8), 32);
		}

		return defaultSize;
	}

	numberFontWeight(): string {
		const weight = this.display.numberWeight;

		if (weight === 'light') return '300';
		if (weight === 'bold') return '700';
		return '400';
	}

	fontSize(): number {
		if (this.isSmall()) return 10;
		if (this.isMedium()) return 14;
		return 16;
	}

	numberPositionMultiplier(): number {
		const markers = this.effectiveMarkers();

		if (markers === 'numbers') {
			if (this.isSmall()) return 0.85;
			if (this.isMedium()) return 0.87;
			return 0.88;
		}

		if (markers === 'lines-numbers') {
			if (this.isSmall()) return 0.68;
			if (this.isMedium()) return 0.70;
			return 0.72;
		}

		if (markers === 'dots-numbers') {
			if (this.isSmall()) return 0.68;
			if (this.isMedium()) return 0.70;
			return 0.72;
		}

		if (this.isSmall()) return 0.85;
		if (this.isMedium()) return 0.87;
		return 0.88;
	}

	labelFontSize(): number {
		if (this.isSmall()) return 10;
		if (this.isMedium()) return 12;
		return 14;
	}

	labelY(): number {
		const position = this.effectiveLabelPosition();
		const offset = this.isSmall() ? 0.35 : 0.4;

		if (position === 'bottom') {
			return this.center() + this.radius() * offset;
		}
		return this.center() - this.radius() * offset;
	}

	centerDotRadius(): number {
		if (this.isSmall()) return 5;
		if (this.isMedium()) return 6;
		return 8;
	}

	centerDotInnerRadius(): number {
		if (this.isSmall()) return 3;
		if (this.isMedium()) return 4;
		return 5;
	}

	borderWidth(): number {
		const customWidth = this.display.borderWidth;

		let defaultWidth: number;
		if (this.isSmall()) defaultWidth = 2;
		else if (this.isMedium()) defaultWidth = 3;
		else defaultWidth = 4;

		if (customWidth !== undefined) {
			return Math.min(Math.max(customWidth, 1), 10);
		}

		return defaultWidth;
	}

	customStyles(): { [key: string]: string } {
		if (!this.customColors) return {};

		const styles: { [key: string]: string } = {};

		if (this.customColors.background && !this.customColors.backgroundGradient) {
			styles['--clock-bg'] = this.customColors.background;
		}

		if (this.customColors.border) styles['--border-color'] = this.customColors.border;

		if (this.customColors.hands?.hour) styles['--hour-hand-color'] = this.customColors.hands.hour;
		if (this.customColors.hands?.minute) styles['--minute-hand-color'] = this.customColors.hands.minute;
		if (this.customColors.hands?.second) styles['--second-hand-color'] = this.customColors.hands.second;

		if (this.customColors.markers?.hour) styles['--hour-marker-color'] = this.customColors.markers.hour;
		if (this.customColors.markers?.minute) styles['--minute-marker-color'] = this.customColors.markers.minute;
		if (this.customColors.markers?.numbers) styles['--number-color'] = this.customColors.markers.numbers;

		if (this.customColors.center?.dot) styles['--center-dot-color'] = this.customColors.center.dot;
		if (this.customColors.center?.ring) styles['--center-dot-outer-color'] = this.customColors.center.ring;

		if (this.customColors.innerRing) styles['--inner-ring-color'] = this.customColors.innerRing;
		if (this.customColors.label) styles['--label-color'] = this.customColors.label;

		return styles;
	}

	hasBackgroundGradient(): boolean {
		return !!this.customColors?.backgroundGradient;
	}

	getGradientType(): 'linear' | 'radial' {
		return this.customColors?.backgroundGradient?.type ?? 'linear';
	}

	isLinearGradient(): boolean {
		return this.getGradientType() === 'linear';
	}

	isRadialGradient(): boolean {
		return this.getGradientType() === 'radial';
	}

	gradientId = 'clock-bg-gradient-' + Math.random().toString(36).substr(2, 9);

	getGradientCoordinates(): { x1: string, y1: string, x2: string, y2: string } {
		const angle = this.customColors?.backgroundGradient?.angle ?? 135;
		const radians = (angle - 90) * (Math.PI / 180);

		const x = Math.cos(radians);
		const y = Math.sin(radians);

		const x1 = 50 - (x * 50);
		const y1 = 50 - (y * 50);
		const x2 = 50 + (x * 50);
		const y2 = 50 + (y * 50);

		return {
			x1: `${x1}%`,
			y1: `${y1}%`,
			x2: `${x2}%`,
			y2: `${y2}%`
		};
	}

	getRadialGradientCoordinates(): { cx: string, cy: string, r: string } {
		return {
			cx: '50%',
			cy: '50%',
			r: '50%'
		};
	}

	getGradientStartColor(): string {
		return this.customColors?.backgroundGradient?.start ?? '#000000';
	}

	getGradientEndColor(): string {
		return this.customColors?.backgroundGradient?.end ?? '#ffffff';
	}

	getCircleFill(): string | undefined {
		if (this.hasBackgroundGradient()) {
			return `url(#${this.gradientId})`;
		}
		return undefined;
	}

	digitalTime = computed(() => {
		if (!this.digitalDisplay?.enabled) return '';

		const format = this.digitalDisplay.format || '24h';
		const showSeconds = this.digitalDisplay.showSeconds ?? true;
		const time = this.currentTime();

		const hours = time.getHours();
		const minutes = time.getMinutes().toString().padStart(2, '0');
		const seconds = time.getSeconds().toString().padStart(2, '0');

		if (format === '12h') {
			const hours12 = (hours % 12 || 12).toString().padStart(2, '0');
			const ampm = hours >= 12 ? 'PM' : 'AM';
			return showSeconds ? `${hours12}:${minutes}:${seconds} ${ampm}` : `${hours12}:${minutes} ${ampm}`;
		}

		const hoursStr = hours.toString().padStart(2, '0');
		return showSeconds ? `${hoursStr}:${minutes}:${seconds}` : `${hoursStr}:${minutes}`;
	});

	digitalDate = computed(() => {
		if (!this.digitalDisplay?.enabled || !this.digitalDisplay?.showDate) return '';

		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			timeZone: this.timezone === 'local' ? undefined : this.timezone
		};

		return this.currentTime().toLocaleDateString('en-US', options);
	});

	getNumberDisplay(hour: number): string {
		const displayHour = hour === 0 ? 12 : hour;

		if (this.effectiveNumberStyle() === 'roman') {
			const romanNumerals: { [key: number]: string } = {
			1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI',
			7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII'
			};
			return romanNumerals[displayHour];
		}

		return displayHour.toString();
	}

	getAriaLabel(): string {
		const time = this.currentTime();
		const hours = time.getHours();
		const minutes = time.getMinutes().toString().padStart(2, '0');

		if (this.digitalDisplay?.format === '12h') {
			const hours12 = hours % 12 || 12;
			const ampm = hours >= 12 ? 'PM' : 'AM';
			return `Current time: ${hours12}:${minutes} ${ampm}`;
		}

		return `Current time: ${hours}:${minutes}`;
	}

	ngOnInit(): void {
		this.validateInputs();

		if (!this.time) {
			this.updateTime();
			this.startTimeUpdates();
			this.startAnimation();
		} else {
			this.setManualTime(this.time);
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['size']) {
			this.validateInputs();
		}

		if (changes['timezone']) {
			this.timezoneOffset.set(0);
			this.updateTime();
		}

		if (changes['hands'] && !changes['hands'].firstChange) {
			const prevHands = changes['hands'].previousValue as HandConfig;
			const currHands = changes['hands'].currentValue as HandConfig;
			
			if (prevHands?.smooth !== currHands?.smooth && !this.time) {
				this.restartAnimation();
			}
		}

		if (changes['time']) {
			if (this.time) {
				this.stopAnimation();
				this.setManualTime(this.time);
			} else if (!changes['time'].firstChange) {
				this.updateTime();
				this.startTimeUpdates();
				this.startAnimation();
			}
		}
	}

	ngOnDestroy(): void {
		this.stopAnimation();
	}

	private validateInputs(): void {
		const validSize = Math.max(100, this.size);
		if (validSize !== this.size) {
			console.warn(`ngx-analog-clock: size must be at least 100px. Using ${validSize} instead of ${this.size}.`);
		}
		this.sizeSignal.set(validSize);
	}

	private setManualTime(time: Date): void {
		if (!(time instanceof Date) || isNaN(time.getTime())) {
			console.error('ngx-analog-clock: Invalid Date provided to time input. Falling back to current time.');
			this.baseTime.set(new Date());
			this.animationTime.set(Date.now());
			return;
		}

		this.baseTime.set(time);
		this.animationTime.set(time.getTime());
		this.tick.emit(time);

		const currentHour = time.getHours();
		if (this.lastEmittedHour !== currentHour) {
			this.hourChange.emit(currentHour);
			this.lastEmittedHour = currentHour;
		}
	}

	private startTimeUpdates(): void {
		this.timeUpdateInterval = setInterval(() => {
			this.updateTime();
		}, 1000);
	}

	private startAnimation(): void {
		if (!this.effectiveSmoothHands()) {
			return;
		}

		let lastFrameTime = 0;
		const targetInterval = 1000 / 30;

		const animate = (timestamp: number) => {
			if (timestamp - lastFrameTime >= targetInterval) {
				this.animationTime.set(Date.now());
				lastFrameTime = timestamp;
			}
			
			this.animationFrameId = requestAnimationFrame(animate);
		};

		this.animationFrameId = requestAnimationFrame(animate);
	}

	private restartAnimation(): void {
		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = undefined;
		}

		if (this.effectiveSmoothHands()) {
			this.startAnimation();
		} else {
			this.animationTime.set(this.baseTime().getTime());
		}
	}

	private stopAnimation(): void {
		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = undefined;
		}
		if (this.timeUpdateInterval) {
			clearInterval(this.timeUpdateInterval);
			this.timeUpdateInterval = undefined;
		}
	}

	private updateTime(): void {
		let newTime: Date;

		if (this.timezone === 'local') {
			newTime = new Date();
			this.timezoneOffset.set(0);
		} else {
			try {
				const localTime = new Date();
				
				const formatter = new Intl.DateTimeFormat('en-US', {
					timeZone: this.timezone,
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					hour12: false
				});
				
				const parts = formatter.formatToParts(localTime);
				const getValue = (type: string) => 
					parts.find(p => p.type === type)?.value || '0';
				
				newTime = new Date(
					parseInt(getValue('year')),
					parseInt(getValue('month')) - 1,
					parseInt(getValue('day')),
					parseInt(getValue('hour')),
					parseInt(getValue('minute')),
					parseInt(getValue('second'))
				);
				
				const offset = newTime.getTime() - localTime.getTime();
				this.timezoneOffset.set(offset);
			} catch {
				console.error('Invalid timezone:', this.timezone);
				newTime = new Date();
				this.timezoneOffset.set(0);
			}
		}

		this.baseTime.set(newTime);
		this.animationTime.set(Date.now());
		this.tick.emit(newTime);

		const currentHour = newTime.getHours();
		if (this.lastEmittedHour !== currentHour) {
			this.hourChange.emit(currentHour);
			this.lastEmittedHour = currentHour;
		}
	}
}