import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalogClockComponent, AnalogClockConfig } from 'ngx-analog-clock';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ClockConfigService } from '../../services/clock-config.service';
import { ConfigModalComponent } from '../../components/config-modal/config-modal';
import { ClockShowcaseItemComponent } from '../../components/clock-showcase-item/clock-showcase-item';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, AnalogClockComponent, ConfigModalComponent, ClockShowcaseItemComponent],
	templateUrl: './showcases.html',
	styleUrl: './showcases.scss'
})
export class Showcases implements OnInit, OnDestroy {
	private subscription?: Subscription;

	customTime = new Date(2026, 0, 1, 0, 0, 0);
	stopwatchLabel = '00:00';
	isRunning = false;

	constructor(
		private cdr: ChangeDetectorRef,
		public clockService: ClockConfigService,
		private router: Router
	) {}

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

	showConfigModal: boolean = false;
	selectedConfig: AnalogClockConfig | null = null;
	selectedClockName: string = '';
	copied: boolean = false;

	// ========== CLOCK DATA ==========

	themes = [
		{ title: 'Light', key: 'lightTheme', configTitle: 'Light Theme' },
		{ title: 'Dark', key: 'darkTheme', configTitle: 'Dark Theme' },
		{ title: 'Custom', key: 'customTheme', configTitle: 'Custom Theme' }
	];

	classic = [
		{ title: 'Swiss', key: 'minimalSwiss', configTitle: 'Swiss Style' },
		{ title: 'Railway', key: 'vintageRailway', configTitle: 'Railway Style' },
		{ title: 'Silver', key: 'classicSilver', configTitle: 'Silver Style' },
		{ title: 'Zen', key: 'minimalZen', configTitle: 'Zen Style' },
		{ title: 'Diamond', key: 'elegantDiamond', configTitle: 'Diamond Style' },
		{ title: 'Green', key: 'classicGreen', configTitle: 'Green Style' },
		{ title: 'Emerald', key: 'classicEmerald', configTitle: 'Emerald Style' },
		{ title: 'Military', key: 'classicBlackWhite', configTitle: 'Military Style' },
		{ title: 'Pink', key: 'classicPink', configTitle: 'Pink Style' },
		{ title: 'Blue', key: 'classicBlue', configTitle: 'Blue Arctic' },
		{ title: 'Retro', key: 'classicOrange', configTitle: 'Retro Orange' },
		{ title: 'Brown', key: 'classicBrown', configTitle: 'Vintage Brown' }
	];

	modern = [
		{ title: 'Aurora', key: 'modernAuroraBorealis', configTitle: 'Aurora Borealis' },
		{ title: 'Iceberg', key: 'modernIcebergBlue', configTitle: 'Iceberg Blue' },
		{ title: 'Northern', key: 'modernNorthernLights', configTitle: 'Northern Lights' },
		{ title: 'Sakura', key: 'modernSakuraDream', configTitle: 'Sakura Dream' },
		{ title: 'Mint', key: 'modernMintChocolate', configTitle: 'Mint Chocolate' },
		{ title: 'Jade', key: 'modernJadeMist', configTitle: 'Jade Mist' },
		{ title: 'Emerald', key: 'modernEmeraldForest', configTitle: 'Emerald Forest' },
		{ title: 'Azure', key: 'modernAzureDepths', configTitle: 'Azure Depths' },
		{ title: 'Brutalist', key: 'modernDarkBrutalist', configTitle: 'Dark Brutalist' },
		{ title: 'Matrix', key: 'modernMatrix', configTitle: 'Cyber Matrix' },
		{ title: 'Vaporwave', key: 'modernVaporwave', configTitle: 'Vaporwave' },
		{ title: 'Ocean', key: 'modernDeepOcean', configTitle: 'Deep Ocean' }
	];

	timezones = [
		{ title: 'New York', key: 'timezoneNewYork', configTitle: 'New York' },
		{ title: 'Sydney', key: 'timezoneSydney', configTitle: 'Sydney' },
		{ title: 'Paris', key: 'timezoneParis', configTitle: 'Paris' },
		{ title: 'Cairo', key: 'timezoneCairo', configTitle: 'Cairo' }
	];

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

	editClock(key: string) {
		this.clockService.setEditingKey(key);
		this.router.navigate(['/playground']);
	}

	getConfig(key: string): AnalogClockConfig {
		return this.clockService.getPreset(key) || this.clockService.presets.lightTheme;
	}

	createViewConfigHandler(key: string, title: string) {
		return () => this.viewConfig(this.getConfig(key), title);
	}

	createEditClockHandler(key: string) {
		return () => this.editClock(key);
	}
}