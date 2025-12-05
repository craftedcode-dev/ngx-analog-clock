import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnalogClockComponent, AnalogClockConfig } from 'ngx-analog-clock';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, RouterLink, AnalogClockComponent],
	templateUrl: './home.html',
	styleUrl: './home.scss'
})
export class Home {
	heroClockConfig: AnalogClockConfig = {
		size: 300,
		theme: 'light'
	};

	exampleClocks: { title: string; config: AnalogClockConfig }[] = [
		{
			title: 'Light Theme',
			config: { theme: 'light', size: 180 }
		},
		{
			title: 'Dark Theme',
			config: { theme: 'dark', size: 180 }
		},
		{
			title: 'Custom Theme',
			config: {
				size: 180,
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
			}
		},
		{
			title: 'Timezone Clock',
			config: {
				size: 180,
				theme: 'dark',
				timezone: 'America/New_York',
				hands: {
					smooth: true
				},
				display: {
					markers: 'lines',
					showInnerRing: true
				},
				digitalDisplay: {
					enabled: true,
					format: '24h',
					showSeconds: true,
					color: '#60a5fa'
				},
				label: {
					text: 'NEW YORK',
					position: 'bottom'
				},
				customColors: {
					backgroundGradient: {
						type: 'radial',
						start: '#1e3a8a',
						end: '#0c1e3f'
					},
					hands: {
						hour: '#e0e7ff',
						minute: '#c7d2fe',
						second: '#60a5fa'
					},
					markers: {
						hour: '#93c5fd',
						minute: '#3b82f6'
					},
					center: {
						dot: '#60a5fa',
						ring: '#e0e7ff'
					},
					innerRing: '#2563eb',
					label: '#e0e7ff'
				}
			}
		}
	];

  	installCode = `npm install @craftedcode-dev/ngx-analog-clock`;

usageCode = `import { Component } from '@angular/core';
import { AnalogClockComponent } from '@craftedcode-dev/ngx-analog-clock';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AnalogClockComponent],
  template: \`
    <ngx-analog-clock [config]="{
      theme: 'dark',
      size: 200
    }" />
  \`
})
export class AppComponent {}`;

  	copied = false;

	copyInstallCommand() {
		navigator.clipboard.writeText(this.installCode).then(() => {
			this.copied = true;
			setTimeout(() => this.copied = false, 2000);
		});
	}
}