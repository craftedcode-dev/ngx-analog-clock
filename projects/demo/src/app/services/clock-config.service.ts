import { Injectable } from '@angular/core';
import { AnalogClockConfig } from 'ngx-analog-clock';
import { CLOCK_PRESETS, PresetKey } from '../configs/clock-presets';

@Injectable({
	providedIn: 'root'
})
export class ClockConfigService {
	readonly presets = CLOCK_PRESETS;
	currentEditingKey: PresetKey | null = null;

	getPreset(key: string): AnalogClockConfig | undefined {
		return this.presets[key as PresetKey];
	}

	getCurrentConfig(): AnalogClockConfig | null {
		if (this.currentEditingKey && this.presets[this.currentEditingKey]) {
			return structuredClone(this.presets[this.currentEditingKey]);
		}
		return null;
	}

	setEditingKey(key: string) {
		if (key in this.presets) {
			this.currentEditingKey = key as PresetKey;
		} else {
			this.currentEditingKey = null;
		}
	}

	clearEditingKey() {
		this.currentEditingKey = null;
	}
}