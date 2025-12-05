import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalogClockComponent, AnalogClockConfig } from 'ngx-analog-clock';

@Component({
	selector: 'app-builder',
	standalone: true,
	imports: [CommonModule, FormsModule, AnalogClockComponent],
	templateUrl: './builder.html',
	styleUrl: './builder.scss'
})
export class Builder implements OnInit, OnDestroy {
	// Basic properties
	size: number = 300;
	theme: 'light' | 'dark' | 'custom' = 'light';
	timezone: string = 'America/New_York';

	// Hands
	hourLength: number = 0.55;
	hourWidth: number = 6;
	hourShow: boolean = true;
	minuteLength: number = 0.7;
	minuteWidth: number = 6;
	minuteShow: boolean = true;
	secondLength: number = 0.8;
	secondWidth: number = 4;
	secondShow: boolean = true;
	smooth: boolean = true;

	// Display
	markers: 'lines' | 'numbers' | 'both' | 'none' = 'lines';
	numberStyle: 'standard' | 'roman' = 'standard';
	showBorder: boolean = true;
	showInnerRing: boolean = true;
	showCenterRing: boolean = true;
	hourMarkerWidth: number = 3;
	minuteMarkerWidth: number = 1;
	borderWidth: number = 10;
	numberSize: number = 16;
	numberWeight: 'normal' | 'bold' = 'bold';

	// Digital Display
	showDigitalDisplay: boolean = false;
	digitalFormat: '12h' | '24h' = '24h';
	digitalShowSeconds: boolean = true;
	digitalShowDate: boolean = false;
	digitalColor: string = '#000000';

	// Label
	labelText: string = '';
	labelPosition: 'top' | 'bottom' = 'bottom';

	// Custom Colors
	useCustomColors: boolean = false;
	customHourHand: string = '#020000';
	customMinuteHand: string = '#020000';
	customSecondHand: string = '#ff6b6b';
	customHourMarker: string = '#020000';
	customMinuteMarker: string = 'rgba(92, 92, 92, 0.3)';
	customBackground: string = '#ffffff';
	customBorder: string = '#e5e7eb';
	customCenterDot: string = '#000000';
	customCenterRing: string = '#000000';
	customInnerRing: string = '#e5e7eb';
	customLabel: string = '#000000';

	// Gradient
	useGradient: boolean = false;
	gradientType: 'linear' | 'radial' = 'radial';
	gradientStart: string = '#667eea';
	gradientEnd: string = '#764ba2';
	gradientAngle: number = 45;

	// Modal & Copy
	showModal: boolean = false;
	copied: boolean = false;

	// Force recreation
	private _configVersion: number = 0;
	showClock: boolean = true;

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		document.body.style.overflow = 'hidden';
	}

	ngOnDestroy() {
		document.body.style.overflow = '';
	}

	get configKey(): string {
		return `clock-${this._configVersion}`;
	}

	forceUpdate() {
		this._configVersion++;
	}

	formatLength(value: number): string {
		return value === 1 ? '1' : value.toFixed(2);
	}

	get hasLabel(): boolean {
		return !!(this.labelText && this.labelText.trim());
	}

	get config(): AnalogClockConfig {
		const config: any = {
			size: this.size,
			theme: this.theme,
			timezone: this.timezone
		};

		config.hands = {
			hour: {
				length: Number(this.hourLength),
				width: Number(this.hourWidth),
				show: this.hourShow
			},
			minute: {
				length: Number(this.minuteLength),
				width: Number(this.minuteWidth),
				show: this.minuteShow
			},
			second: {
				length: Number(this.secondLength),
				width: Number(this.secondWidth),
				show: this.secondShow
			},
			smooth: this.smooth
		};

		config.display = {
			markers: this.markers,
			numberStyle: this.numberStyle,
			showBorder: this.showBorder,
			showInnerRing: this.showInnerRing,
			showCenterRing: this.showCenterRing,
			hourMarkerWidth: Number(this.hourMarkerWidth),
			minuteMarkerWidth: Number(this.minuteMarkerWidth),
			borderWidth: Number(this.borderWidth),
			numberSize: Number(this.numberSize),
			numberWeight: this.numberWeight
		};

		if (this.showDigitalDisplay) {
			config.digitalDisplay = {
			enabled: true,
			format: this.digitalFormat,
			showSeconds: this.digitalShowSeconds,
			showDate: this.digitalShowDate
			};
			
			if (this.theme === 'custom' && this.digitalColor) {
				config.digitalDisplay.color = this.digitalColor;
			}
		}

		if (this.hasLabel) {
			config.label = {
				text: this.labelText,
				position: this.labelPosition
			};
		}

		if (this.useCustomColors && this.theme === 'custom') {
			config.customColors = {
				hands: {
					hour: this.customHourHand,
					minute: this.customMinuteHand,
					second: this.customSecondHand
				},
				markers: {
					hour: this.customHourMarker,
					minute: this.customMinuteMarker
				},
				center: {
					dot: this.customCenterDot,
					ring: this.customCenterRing
				},
				background: this.customBackground,
				border: this.customBorder,
				innerRing: this.customInnerRing
			};

			if (this.hasLabel) {
				config.customColors.label = this.customLabel;
			}

			if (this.useGradient) {
				config.customColors.backgroundGradient = {
					type: this.gradientType,
					start: this.gradientStart,
					end: this.gradientEnd
				};

				if (this.gradientType === 'linear') {
					config.customColors.backgroundGradient.angle = this.gradientAngle;
				}
			}
		}

		const clonedConfig = JSON.parse(JSON.stringify(config));
		return clonedConfig;
	}

	get generatedCode(): string {
		return `config: AnalogClockConfig = ${JSON.stringify(this.config, null, 2)};`;
	}

	onCustomColorChange() {
		if (this.theme !== 'custom') {
			this.theme = 'custom';
			if (!this.useCustomColors) {
			this.useCustomColors = true;
			this.initializeCustomColors();
			}
		}
		this.forceUpdate();
	}

	onUseCustomColorsChange() {
		if (this.useCustomColors) {
			if (this.theme !== 'custom') {
			this.theme = 'custom';
			}
			this.initializeCustomColors();
		}
		this.forceUpdate();
	}

	initializeCustomColors() {
		if (this.theme === 'light') {
			this.customHourHand = '#020000';
			this.customMinuteHand = '#020000';
			this.customSecondHand = '#ff6b6b';
			this.customHourMarker = '#020000';
			this.customMinuteMarker = 'rgba(92, 92, 92, 0.3)';
			this.customBackground = '#ffffff';
			this.customBorder = '#e5e7eb';
			this.customCenterDot = '#000000';
			this.customCenterRing = '#000000';
			this.customInnerRing = '#e5e7eb';
			this.customLabel = '#000000';
			this.digitalColor = '#000000';
		} else if (this.theme === 'dark') {
			this.customHourHand = '#ffffff';
			this.customMinuteHand = '#ffffff';
			this.customSecondHand = '#ff6b6b';
			this.customHourMarker = '#ffffff';
			this.customMinuteMarker = '#ffffff';
			this.customBackground = '#1e293b';
			this.customBorder = '#334155';
			this.customCenterDot = '#ffffff';
			this.customCenterRing = '#ffffff';
			this.customInnerRing = '#334155';
			this.customLabel = '#ffffff';
			this.digitalColor = '#ffffff';
		}
	}

	onThemeChange() {
		if (this.theme !== 'custom') {
			this.useCustomColors = false;
		}
		this.forceUpdate();
	}

	openModal() {
		this.showModal = true;
	}

	closeModal() {
		this.showModal = false;
		this.copied = false;
	}

	copyToClipboard() {
		navigator.clipboard.writeText(this.generatedCode).then(() => {
			this.copied = true;
			setTimeout(() => this.copied = false, 2000);
		});
	}

	resetToDefaults() {
		// Basic
		this.size = 300;
		this.theme = 'light';
		this.timezone = 'America/New_York';

		// Hands
		this.hourLength = 0.55;
		this.hourWidth = 6;
		this.hourShow = true;
		this.minuteLength = 0.7;
		this.minuteWidth = 6;
		this.minuteShow = true;
		this.secondLength = 0.8;
		this.secondWidth = 4;
		this.secondShow = true;
		this.smooth = true;

		// Display
		this.markers = 'lines';
		this.numberStyle = 'standard';
		this.showBorder = true;
		this.showInnerRing = true;
		this.showCenterRing = true;
		this.hourMarkerWidth = 3;
		this.minuteMarkerWidth = 1;
		this.borderWidth = 10;
		this.numberSize = 16;
		this.numberWeight = 'bold';

		// Digital Display
		this.showDigitalDisplay = false;
		this.digitalFormat = '24h';
		this.digitalShowSeconds = true;
		this.digitalShowDate = false;
		this.digitalColor = '#000000';

		// Label
		this.labelText = '';
		this.labelPosition = 'bottom';

		// Custom Colors
		this.useCustomColors = false;
		this.useGradient = false;

		this.forceUpdate();
	}
}