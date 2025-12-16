import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalogClockComponent, AnalogClockConfig } from 'ngx-analog-clock';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ClockConfigService } from '../../services/clock-config.service';
import { ConfigModalComponent } from '../../components/config-modal/config-modal';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, AnalogClockComponent, ConfigModalComponent],
	templateUrl: './showcases.html',
	styleUrl: './showcases.scss'
})
export class Showcases implements OnInit, OnDestroy {
	private subscription?: Subscription;

	customTime = new Date(2024, 0, 1, 0, 0, 0);
	stopwatchLabel = '00:00';
	isRunning = false;

	constructor(private cdr: ChangeDetectorRef,
				public clockService: ClockConfigService,
				private router: Router) {}

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
}