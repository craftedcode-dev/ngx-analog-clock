import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalogClockComponent, AnalogClockConfig } from 'ngx-analog-clock';
import { interval, Subscription } from 'rxjs';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, AnalogClockComponent],
	templateUrl: './showcases.html',
	styleUrl: './showcases.scss'
})
export class Showcases implements OnInit, OnDestroy {
	private subscription?: Subscription;

	customTime = new Date(2024, 0, 1, 0, 0, 0);
	stopwatchLabel = '00:00';
	isRunning = false;

	constructor(private cdr: ChangeDetectorRef) {}

	customTimeControlConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
			hour: { show: false },
			minute: { show: false },
			second: { show: true, length: 0.9, width: 2 },
			smooth: false
		},
		label: {
			text: this.stopwatchLabel,
			position: 'bottom'
		},
		display: {
			markers: 'lines',
			showInnerRing: true
		},
		customColors: {
			hands: {
				minute: '#d93025'
			}
		}
	};

	customThemeConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
			hour: { length: 0.7, width: 7 },
			minute: { length: 0.8, width: 7 },
			second: { length: 0.9, width: 5 }
		},
		display: {
			markers: 'none',
			showBorder: false,
			showInnerRing: false,
			showCenterRing: false,
			borderWidth: 0
		},
		customColors: {
			backgroundGradient: {
				type: 'radial',
				start: '#4a0034',
				end: '#0a0000'
			},
			border: '#ff007f',
			hands: {
				hour: '#ff6a00',
				minute: '#ff6a00',
				second: '#ff007f'
			},
			markers: {
				hour: '#ff6a00',
				minute: '#ff2e63'
			},
			center: {
				dot: '#ff007f',
				ring: '#ff6a00'
			},
			innerRing: '#ff2e63'
		}
	};

	classicBlackWhiteConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
			hour: { length: 0.6, width: 4 },
			minute: { length: 0.8, width: 3 },
			second: { length: 0.9, width: 1 },
			smooth: false
		},
		display: {
			markers: 'lines',
			numberStyle: 'roman',
			showBorder: false,
			showInnerRing: false,
			showCenterRing: false,
			numberSize: 16,
			numberWeight: 'normal',
			hourMarkerWidth: 2,
			minuteMarkerWidth: 1,
			borderWidth: 3
		},
		customColors: {
			background: '#ffffff',
			border: '#000000',
			hands: {
				hour: '#000000',
				minute: '#000000',
				second: '#FF3131'
			},
			markers: {
				hour: '#000000',
				minute: '#000000',
				numbers: '#000000'
			},
			center: {
				dot: '#000000'
			}
		}
	};

	classicPinkConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
			hour: { length: 0.6, width: 3 },
			minute: { length: 0.75, width: 2 },
			second: { length: 0.9, width: 1 },
			smooth: false
		},
		display: {
			markers: 'lines',
			showBorder: false,
			showInnerRing: false,
			showCenterRing: false
		},
		customColors: {
			background: '#fdf2f8',
			hands: {
				hour: '#be185d',
				minute: '#db2777',
				second: '#ec4899'
			},
			markers: {
				hour: '#be185d',
				minute: '#be185d'
			},
			center: {
				dot: '#be185d'
			}
		}
	};

	classicBlueConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
			hour: { length: 0.6, width: 4 },
			minute: { length: 0.75, width: 3 },
			second: { length: 0.9, width: 1 },
			smooth: false
		},
		display: {
			markers: 'both',
			numberStyle: 'arabic',
			showBorder: true,
			showInnerRing: true,
			showCenterRing: true
		},
		label: {
			text: 'Arctic',
			position: 'top'
		},
		customColors: {
			background: '#f0f9ff',
			border: '#0ea5e9',
			hands: {
				hour: '#0c4a6e',
				minute: '#0369a1',
				second: '#e11d48'
			},
			markers: {
				hour: '#075985'
			},
			center: {
				dot: '#e11d48',
				ring: '#0ea5e9'
			},
			innerRing: '#38bdf8',
			label: '#0369a1'
		}
	};

	classicBrownConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
			hour: { length: 0.6, width: 4 },
			minute: { length: 0.75, width: 3 },
			second: { length: 0.9, width: 1 },
			smooth: false
		},
		display: {
			markers: 'both',
			numberStyle: 'roman',
			showBorder: true,
			showInnerRing: true,
			showCenterRing: false
		},
		label: {
			text: 'VINTAGE',
			position: 'bottom'
		},
		customColors: {
			background: '#fef3c7',
			border: '#92400e',
			hands: {
				hour: '#78350f',
				minute: '#78350f',
				second: '#dc2626'
			},
			markers: {
				hour: '#78350f',
				numbers: '#451a03'
			},
			center: {
				dot: '#92400e'
			},
			innerRing: '#d97706',
			label: '#78350f'
		}
	};

	modernDarkBrutalistConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
			hour: { length: 0.55, width: 7 },
			minute: { length: 0.65, width: 7 },
			second: { length: 0.8, width: 5 },
			smooth: true
		},
		display: {
			markers: 'lines',
			hourMarkerWidth: 5,
			minuteMarkerWidth: 0,
			showBorder: false,
			showInnerRing: false,
			showCenterRing: false,
			borderWidth: 10
		},
		customColors: {
			backgroundGradient: {
				type: 'radial',
				start: '#404040',
				end: '#0a0a0a'
			},
			border: '#fbbf24',
			hands: {
				hour: '#ffffff',
				minute: '#ffffff',
				second: '#fbbf24'
			},
			markers: {
				hour: '#ffffff',
				minute: '#606060'
			},
			center: {
				dot: '#fbbf24',
				ring: '#ffffff'
			},
			innerRing: '#c1bebeff',
			label: '#080805ff'
		}
	};

	modernMatrixConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
			hour: { length: 0.55, width: 7 },
			minute: { length: 0.65, width: 7 },
			second: { length: 0.8, width: 5 },
			smooth: true
		},
		display: {
			markers: 'lines',
			showInnerRing: true,
			showCenterRing: false,
			hourMarkerWidth: 5,
			minuteMarkerWidth: 2
		},
		customColors: {
			backgroundGradient: {
				type: 'radial',
				start: '#003300',
				end: '#000000'
			},
			border: '#00ff41',
			hands: {
				hour: '#00ff41',
				minute: '#00ff41',
				second: '#39ff14'
			},
			markers: {
				hour: '#00ff41',
				minute: '#009933'
			},
			center: {
				dot: '#39ff14',
				ring: '#00ff41'
			},
			innerRing: '#00ff41'
		}
	};

	modernVaporwaveConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
			hour: { length: 0.5, width: 6 },
			minute: { length: 0.7, width: 6 },
			second: { length: 0.85, width: 4 },
			smooth: true
		},
		display: {
			markers: 'lines',
			hourMarkerWidth: 5,
			minuteMarkerWidth: 0
		},
		customColors: {
			backgroundGradient: {
				type: 'linear',
				start: '#ff77ff',
				end: '#77ddff',
				angle: 360
			},
			hands: {
				hour: '#fff',
				minute: '#fff',
				second: '#fff'
			},
			markers: {
				hour: '#ffffff',
				minute: '#ffeeff'
			},
			center: { dot: '#ffffff' }
		}
	};

	modernSteelBlueConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
			hour: { length: 0.55, width: 7 },
			minute: { length: 0.7, width: 6 },
			second: { length: 1, width: 4 },
			smooth: true
		},
		display: {
			markers: 'lines',
			hourMarkerWidth: 5,
			minuteMarkerWidth: 0,
			showBorder: false
		},
		customColors: {
			backgroundGradient: {
				type: 'radial',
				start: '#1e3a5f',
				end: '#0a1a2f'
			},
			border: '#4fc3f7',
			hands: {
				hour: '#bbdefb',
				minute: '#4fc3f7',
				second: '#81d4fa'
			},
			markers: {
				hour: '#bbdefb',
				minute: '#4fc3f7'
			},
			center: { dot: '#81d4fa' }
		}
	};

	timezoneSydneyConfig: AnalogClockConfig = {
		theme: 'light',
		timezone: 'Australia/Sydney',
		hands: {
			smooth: true
		},
		digitalDisplay: {
			enabled: true,
			format: '24h',
			showSeconds: true,
		},
	};

	timezoneNewYorkConfig: AnalogClockConfig = {
		theme: 'light',
		timezone: 'America/New_York',
		digitalDisplay: {
			enabled: true,
			format: '24h',
			showSeconds: true,
		},
	};

	timezoneParisConfig: AnalogClockConfig = {
		theme: 'light',
		timezone: 'Europe/Paris',
		digitalDisplay: {
			enabled: true,
			format: '24h',
			showSeconds: true,
		},
	};

	timezoneCairoConfig: AnalogClockConfig = {
		theme: 'light',
		timezone: 'Africa/Cairo',
		digitalDisplay: {
			enabled: true,
			format: '24h',
			showSeconds: true,
		},
	};

	classicOrangeConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
			hour: { length: 0.6, width: 4 },
			minute: { length: 0.7, width: 3 },
			second: { length: 0.75, width: 2 },
			smooth: false
		},
		display: {
			markers: 'numbers',
			numberStyle: 'arabic',
			showBorder: true,
			showInnerRing: false,
			showCenterRing: true
		},
		customColors: {
			background: '#fffbeb',
			border: '#f59e0b',
			hands: {
				hour: '#92400e',
				minute: '#d97706',
				second: '#dc2626'
			},
			markers: {
				hour: '#78350f',
				numbers: '#92400e'
			},
			center: {
				dot: '#dc2626',
				ring: '#f59e0b'
			}
		}
	};

	classicEmeraldConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
			hour: { length: 0.6, width: 4 },
			minute: { length: 0.8, width: 3 },
			second: { length: 0.9, width: 1 },
			smooth: false
		},
		display: {
			markers: 'lines',
			showBorder: true,
			showInnerRing: true,
			showCenterRing: false,
			hourMarkerWidth: 3,
			minuteMarkerWidth: 1,
			borderWidth: 6
		},
		customColors: {
			background: '#f0fdf4',
			border: '#065f46',
			hands: {
				hour: '#064e3b',
				minute: '#047857',
				second: '#fbbf24'
			},
			markers: {
				hour: '#065f46',
				minute: '#34d399'
			},
			center: {
				dot: '#fbbf24',
				ring: '#065f46'
			},
			innerRing: '#10b981'
		}
	};

	classicSilverConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
			hour: { length: 0.65, width: 3 },
			minute: { length: 0.75, width: 2 },
			second: { length: 0.9, width: 1 },
			smooth: false
		},
		display: {
			markers: 'lines',
			showBorder: false,
			showInnerRing: false,
			showCenterRing: false,
			hourMarkerWidth: 2,
			minuteMarkerWidth: 1
		},
		customColors: {
			background: '#f8fafc',
			hands: {
				hour: '#475569',
				minute: '#64748b',
				second: '#ef4444'
			},
			markers: {
				hour: '#94a3b8',
				minute: '#cbd5e1'
			},
			center: {
				dot: '#ef4444'
			}
		}
	};

	modernSunsetOrangeConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
			hour: { length: 0.55, width: 7 },
			minute: { length: 0.7, width: 6 },
			second: { length: 0.9, width: 4 },
			smooth: true
		},
		display: {
			markers: 'lines',
			hourMarkerWidth: 5,
			minuteMarkerWidth: 2,
			showBorder: true,
			showInnerRing: false,
			showCenterRing: true,
			borderWidth: 8
		},
		customColors: {
			backgroundGradient: {
				type: 'radial',
				start: '#f97316',
				end: '#7c2d12',
			},
			border: '#fb923c',
			hands: {
				hour: '#fff7ed',
				minute: '#ffedd5',
				second: '#fbbf24'
			},
			markers: {
				hour: '#fdba74',
				minute: '#f97316'
			},
			center: {
				dot: '#fbbf24',
				ring: '#fed7aa'
			}
		}
	};

	classicGreenConfig: AnalogClockConfig = {
		size: 200,
		theme: 'custom',
		timezone: 'local',

		display: {
			markers: 'numbers',
			showCenterRing: true
		},

		hands: {
			hour: { length: 0.55, width: 4 },
			minute: { length: 0.65, width: 3 },
			second: { length: 0.75, width: 2 },
			smooth: false
		},

		customColors: {
			background: '#e8f5e9',
			border: '#4caf50',
			hands: {
				hour: '#2e7d32',
				minute: '#388e3c',
				second: '#66bb6a'
			},
			markers: {
				hour: '#1b5e20'
			},
			center: {
				dot: '#4caf50',
				ring: '#4caf50',
			}
		}
	};


	modernCyberYellowConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
		hour: { length: 0.6, width: 9 },
		minute: { length: 0.7, width: 8 },
		second: { length: 0.8, width: 6 },
		smooth: true
		},
		display: {
			markers: 'lines',
			hourMarkerWidth: 7,
			minuteMarkerWidth: 0,
			showBorder: true,
			showInnerRing: true,
			showCenterRing: false,
			borderWidth: 14
		},
		customColors: {
			backgroundGradient: {
				type: 'radial',
				start: '#854d0e',
				end: '#0a0a00'
			},
			border: '#eab308',
			hands: {
				hour: '#fef9c3',
				minute: '#fef08a',
				second: '#84cc16'
			},
			markers: {
				hour: '#facc15'
			},
			center: {
				dot: '#84cc16',
				ring: '#fef9c3'
			},
			innerRing: '#ca8a04'
		}
	};

	modernMidnightBlueConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
		hour: { length: 0.6, width: 6 },
		minute: { length: 0.8, width: 5 },
		second: { length: 0.9, width: 3 },
		smooth: true
		},
		display: {
			markers: 'lines',
			hourMarkerWidth: 4,
			minuteMarkerWidth: 2,
			showBorder: false,
			showInnerRing: true,
			showCenterRing: true
		},
		customColors: {
			backgroundGradient: {
				type: 'linear',
				start: '#1e3a8a',
				end: '#0f172a',
				angle: 135
			},
			hands: {
				hour: '#dbeafe',
				minute: '#bfdbfe',
				second: '#f59e0b'
			},
			markers: {
				hour: '#93c5fd',
				minute: '#3b82f6'
			},
			center: {
				dot: '#f59e0b',
				ring: '#dbeafe'
			},
			innerRing: '#1e40af'
		}
	};

	modernTealConfig: AnalogClockConfig = {
		theme: 'custom',
		hands: {
			hour: { length: 0.6, width: 7 },
			minute: { length: 0.8, width: 5 },
			second: { length: 0.9, width: 2 },
			smooth: true
		},
		display: {
			markers: 'lines',
			hourMarkerWidth: 4,
			minuteMarkerWidth: 1,
			showBorder: false,
			showInnerRing: true,
			showCenterRing: true
		},
		customColors: {
			backgroundGradient: {
				type: 'radial',
				start: '#14b8a6',
				end: '#042f2e'
			},
			hands: {
				hour: '#f0fdfa',
				minute: '#ccfbf1',
				second: '#fbbf24'
			},
			markers: {
				hour: '#5eead4',
				minute: '#2dd4bf'
			},
			center: {
				dot: '#fbbf24',
				ring: '#99f6e4'
			},
			innerRing: '#0d9488'
		}
	};

	showConfigModal: boolean = false;
	selectedConfig: AnalogClockConfig | null = null;
	selectedClockName: string = '';
	copied: boolean = false;

	ngOnInit() {
		this.start();
	}

	ngOnDestroy() {
		this.stop();
	}

	private start() {
		this.stop();
		this.isRunning = true;

		this.subscription = interval(1000).subscribe(() => {
			this.customTime = new Date(this.customTime.getTime() + 1000);
			
			const mins = this.customTime.getMinutes().toString().padStart(2, '0');
			const secs = this.customTime.getSeconds().toString().padStart(2, '0');
			this.customTimeControlConfig.label!.text = `${mins}:${secs}`;
			
			this.cdr.markForCheck();
		});
	}

	addSecond() {
		this.customTime = new Date(this.customTime.getTime() + 1000);

		const mins = this.customTime.getMinutes().toString().padStart(2, '0');
		const secs = this.customTime.getSeconds().toString().padStart(2, '0');
		this.customTimeControlConfig.label!.text = `${mins}:${secs}`;
	}

	private stop() {
		if (this.subscription) {
			this.subscription.unsubscribe();
			this.subscription = undefined;
		}
		this.isRunning = false;
	}

	viewConfig(config: AnalogClockConfig, name: string) {
		this.selectedConfig = config;
		this.selectedClockName = name;
		this.showConfigModal = true;
	}

	closeModal() {
		this.showConfigModal = false;
		this.selectedConfig = null;
		this.selectedClockName = '';
		this.copied = false;
	}

	copyConfig() {
		if (this.selectedConfig) {
			const configCode = `config: AnalogClockConfig = ${JSON.stringify(this.selectedConfig, null, 2)};`;
			navigator.clipboard.writeText(configCode).then(() => {
				this.copied = true;
				setTimeout(() => this.copied = false, 2000);
			});
		}
	}

	get formattedConfig(): string {
		if (!this.selectedConfig) return '';
		return JSON.stringify(this.selectedConfig, null, 2);
	}
}