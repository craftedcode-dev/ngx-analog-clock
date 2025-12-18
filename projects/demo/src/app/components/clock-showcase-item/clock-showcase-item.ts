import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalogClockComponent, AnalogClockConfig } from 'ngx-analog-clock';

@Component({
  selector: 'app-clock-showcase-item',
  standalone: true,
  imports: [CommonModule, AnalogClockComponent],
  templateUrl: './clock-showcase-item.html',
  styleUrl: './clock-showcase-item.scss'
})
export class ClockShowcaseItemComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) config!: AnalogClockConfig;
  @Input({ required: true }) configKey!: string;
  @Input() configTitle?: string;
  @Input() time?: Date;
  @Input({ required: true }) onViewConfig!: () => void;
  @Input({ required: true }) onEditClock!: () => void;
}