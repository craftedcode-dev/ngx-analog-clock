import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-config-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config-modal.html',
  styleUrls: ['./config-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigModalComponent {
	@Input() show = false;
	@Input() title = '';

	@Input() set code(value: string) {
		this._code = this.formatConfigCode(value);
	}
	get code(): string {
		return this._code;
	}

	private _code = '';

	@Output() close = new EventEmitter<void>();

	copied = false;

	constructor(private cdr: ChangeDetectorRef) {}

	closeModal(): void {
		this.close.emit();
	}

	async copyToClipboard(): Promise<void> {
		try {
			await navigator.clipboard.writeText(this.code);
			this.copied = true;
			this.cdr.markForCheck();
			setTimeout(() => {
				this.copied = false;
				this.cdr.markForCheck();
			}, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	private formatConfigCode(code: string): string {
		if (!code) return '';

		let jsonString = code;
		if (code.includes('config: AnalogClockConfig = ')) {
			jsonString = code.replace('config: AnalogClockConfig = ', '').replace(/;$/, '');
		}

		try {
			const config = JSON.parse(jsonString);
			const formatted = JSON.stringify(config, null, 2)
			.replace(/"([^"]+)":/g, '$1:')
			.replace(/: "([^"]+)"/g, ": '$1'")
			.replace(/true/g, 'true')
			.replace(/false/g, 'false')
			.replace(/null/g, 'null');
			
			return `config: AnalogClockConfig = ${formatted};`;
		} catch (e) {
			return code;
		}
	}
}