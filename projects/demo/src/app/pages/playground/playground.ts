import { Component, ChangeDetectorRef, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalogClockComponent, AnalogClockConfig } from 'ngx-analog-clock';
import { ClockConfigService } from '../../services/clock-config.service';
import { ConfigModalComponent } from '../../components/config-modal/config-modal';

@Component({
	selector: 'app-playground',
	standalone: true,
	imports: [CommonModule, FormsModule, AnalogClockComponent, ConfigModalComponent],
	templateUrl: './playground.html',
	styleUrl: './playground.scss'
})
export class Playground implements OnInit, OnDestroy, AfterViewInit {
	size = 300;
	maxSize = 400;
	theme: 'light' | 'dark' | 'custom' = 'light';
	timezone = 'America/New_York';
	currentConfig: AnalogClockConfig | null = null;

	hourLength = 0.55;
	hourWidth = 6;
	hourShow = true;
	minuteLength = 0.7;
	minuteWidth = 6;
	minuteShow = true;
	secondLength = 0.8;
	secondWidth = 4;
	secondShow = true;
	smooth = true;

	markers: 'lines' | 'numbers' | 'dots' | 'lines-numbers' | 'dots-numbers' | 'none' = 'lines';
	numberStyle: 'arabic' | 'roman' = 'arabic';
	showBorder = false;
	showInnerRing = true;
	showCenterRing = true;
	hourMarkerWidth = 3;
	minuteMarkerWidth = 1;
	borderWidth = 10;
	numberSize = 16;
	numberWeight: 'light' | 'normal' | 'bold' = 'bold';

	showDigitalDisplay = false;
	digitalFormat: '12h' | '24h' = '24h';
	digitalShowSeconds = true;
	digitalShowDate = false;
	digitalColor = '#000000';

	labelText = '';
	labelPosition: 'top' | 'bottom' = 'bottom';

	useCustomColors = false;
	customHourHand = '#020000';
	customMinuteHand = '#020000';
	customSecondHand = '#ff6b6b';
	customHourMarker = '#020000';
	customMinuteMarker = 'rgba(92, 92, 92, 0.3)';
	customBackground = '#ffffff';
	customBorder = '#e5e7eb';
	customCenterDot = '#000000';
	customCenterRing = '#000000';
	customInnerRing = '#e5e7eb';
	customLabel = '#000000';

	useGradient = false;
	gradientType: 'linear' | 'radial' = 'radial';
	gradientStart = '#1e3a5f';
	gradientEnd = '#0a1a2f';
	gradientAngle = 45;

	showConfigModal = false;
	selectedClockName = 'Generated Config';
	formattedConfig = '';

	private timezoneDebounce: any;
	private _configVersion = 0;

	constructor(
		private cdr: ChangeDetectorRef,
		public clockService: ClockConfigService
	) {}

	ngOnInit(): void {
		document.body.style.overflow = 'hidden';

		const mediaQuery = window.matchMedia('(max-width: 768px)');
		if (mediaQuery.matches) {
			this.size = 250;
			this.maxSize = 300;
		}
		
		if (this.clockService.currentEditingKey) {
			this.loadConfig();
		} else {
			this.currentConfig = null;
		}
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.initializeAllSliders();
		}, 100);
	}

	ngOnDestroy(): void {
		document.body.style.overflow = '';
		this.clockService.clearEditingKey();
	}

	get configKey(): string {
		return `clock-${this._configVersion}`;
	}

	loadConfig(): void {
		this.currentConfig = this.clockService.getCurrentConfig();

		console.log(this.currentConfig);
		if (!this.currentConfig) return;

		this.theme = this.currentConfig.theme ?? this.theme;
		this.timezone = this.currentConfig.timezone ?? 'local';

		if (this.currentConfig.hands) {
			this.hourLength = this.currentConfig.hands.hour?.length ?? this.hourLength;
			this.hourWidth = this.currentConfig.hands.hour?.width ?? this.hourWidth;
			this.hourShow = this.currentConfig.hands.hour?.show ?? this.hourShow;

			this.minuteLength = this.currentConfig.hands.minute?.length ?? this.minuteLength;
			this.minuteWidth = this.currentConfig.hands.minute?.width ?? this.minuteWidth;
			this.minuteShow = this.currentConfig.hands.minute?.show ?? this.minuteShow;

			this.secondLength = this.currentConfig.hands.second?.length ?? this.secondLength;
			this.secondWidth = this.currentConfig.hands.second?.width ?? this.secondWidth;
			this.secondShow = this.currentConfig.hands.second?.show ?? this.secondShow;

			this.smooth = this.currentConfig.hands.smooth ?? this.smooth;
		}

		if (this.currentConfig.display) {
			this.markers = this.currentConfig.display.markers ?? this.markers;
			this.numberStyle = this.currentConfig.display.numberStyle ?? this.numberStyle;
			this.numberWeight = this.currentConfig.display.numberWeight ?? this.numberWeight;
			this.showBorder = this.currentConfig.display.showBorder ?? this.showBorder;
			this.showInnerRing = this.currentConfig.display.showInnerRing ?? this.showInnerRing;
			this.showCenterRing = this.currentConfig.display.showCenterRing ?? this.showCenterRing;
			this.hourMarkerWidth = this.currentConfig.display.hourMarkerWidth ?? this.hourMarkerWidth;
			this.minuteMarkerWidth = this.currentConfig.display.minuteMarkerWidth ?? this.minuteMarkerWidth;
			this.borderWidth = this.currentConfig.display.borderWidth ?? this.borderWidth;
			this.numberSize = this.currentConfig.display.numberSize ?? this.numberSize;
		}

		if (this.currentConfig.digitalDisplay) {
			this.showDigitalDisplay = this.currentConfig.digitalDisplay.enabled ?? this.showDigitalDisplay;
			this.digitalFormat = this.currentConfig.digitalDisplay.format ?? this.digitalFormat;
			this.digitalShowSeconds = this.currentConfig.digitalDisplay.showSeconds ?? this.digitalShowSeconds;
			this.digitalShowDate = this.currentConfig.digitalDisplay.showDate ?? this.digitalShowDate;
			this.digitalColor = this.currentConfig.digitalDisplay.color ?? this.digitalColor;
		}

		if (this.currentConfig.label) {
			this.labelText = this.currentConfig.label.text ?? this.labelText;
			this.labelPosition = this.currentConfig.label.position ?? this.labelPosition;
		}

		if (this.currentConfig.customColors) {
			this.useCustomColors = true;
			const c = this.currentConfig.customColors;
			this.customHourHand = c.hands?.hour ?? this.customHourHand;
			this.customMinuteHand = c.hands?.minute ?? this.customMinuteHand;
			this.customSecondHand = c.hands?.second ?? this.customSecondHand;
			this.customHourMarker = c.markers?.hour ?? this.customHourMarker;
			this.customMinuteMarker = c.markers?.minute ?? this.customMinuteMarker;
			this.customBackground = c.background ?? this.customBackground;
			this.customBorder = c.border ?? this.customBorder;
			this.customCenterDot = c.center?.dot ?? this.customCenterDot;
			this.customCenterRing = c.center?.ring ?? this.customCenterRing;
			this.customInnerRing = c.innerRing ?? this.customInnerRing;
			this.customLabel = c.label ?? this.customLabel;

			if (c.backgroundGradient) {
				this.useGradient = true;
				this.gradientType = c.backgroundGradient.type ?? this.gradientType;
				this.gradientStart = c.backgroundGradient.start ?? this.gradientStart;
				this.gradientEnd = c.backgroundGradient.end ?? this.gradientEnd;
				this.gradientAngle = c.backgroundGradient.angle ?? this.gradientAngle;
			}
		}

		this.cdr.detectChanges();
		
		setTimeout(() => {
			this.initializeAllSliders();
		}, 100);
	}

	updateConfig(): void {
		this._configVersion++;
		this.cdr.detectChanges();
		
		setTimeout(() => {
			this.initializeAllSliders();
		}, 100);
	}

	onTimezoneChange(value: string): void {
		clearTimeout(this.timezoneDebounce);
		this.timezone = value;
		this.timezoneDebounce = setTimeout(() => {
			this.updateConfig();
		}, 500);
	}

	formatLength(value: number): string {
		return value === 1 ? '1' : value.toFixed(2);
	}

	get hasLabel(): boolean {
		return !!(this.labelText?.trim());
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

		return JSON.parse(JSON.stringify(config));
	}

	onUseCustomColorsChange(): void {
		if (this.useCustomColors) {
			if (this.theme !== 'custom') {
				this.theme = 'custom';
			}
			if (!this.currentConfig?.customColors) {
				this.initializeCustomColors();
			}
		}
		this.updateConfig();
	}

	initializeCustomColors(): void {
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

	onThemeChange(): void {
		if (this.theme !== 'custom') {
			this.useCustomColors = false;
		} else {
			if (!this.currentConfig?.customColors) {
				this.useCustomColors = true;
				this.initializeCustomColors();
			} else {
				this.useCustomColors = true;
			}
		}
		this.updateConfig();
	}

	openModal(): void {
		this.formattedConfig = JSON.stringify(this.config, null, 2);
		this.showConfigModal = true;
	}

	closeModal(): void {
		this.showConfigModal = false;
	}

	resetToDefaults(): void {
		if (this.clockService.currentEditingKey) {
			this.loadConfig();
			this.updateConfig();
			return;
		}

		this.size = 300;
		this.theme = 'light';
		this.timezone = 'America/New_York';

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

		this.markers = 'lines';
		this.numberStyle = 'arabic';
		this.showBorder = false;
		this.showInnerRing = true;
		this.showCenterRing = true;
		this.hourMarkerWidth = 3;
		this.minuteMarkerWidth = 1;
		this.borderWidth = 10;
		this.numberSize = 16;
		this.numberWeight = 'bold';

		this.showDigitalDisplay = false;
		this.digitalFormat = '24h';
		this.digitalShowSeconds = true;
		this.digitalShowDate = false;
		this.digitalColor = '#000000';

		this.labelText = '';
		this.labelPosition = 'bottom';

		this.useCustomColors = false;
		this.useGradient = false;

		this.updateConfig();
	}

	onRangeInput(event: Event): void {
		const input = event.target as HTMLInputElement;
		this.updateSliderBackground(input);
	}

	private initializeAllSliders(): void {
		const sliders = document.querySelectorAll<HTMLInputElement>('input[type="range"]');
		sliders.forEach(slider => {
			this.updateSliderBackground(slider);
		});
	}

	private updateSliderBackground(slider: HTMLInputElement): void {
		const value = parseFloat(slider.value);
		const min = parseFloat(slider.min);
		const max = parseFloat(slider.max);
		const percentage = ((value - min) / (max - min)) * 100;
		
		slider.style.background = `linear-gradient(to right, #667eea 0%, #667eea ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
	}
}