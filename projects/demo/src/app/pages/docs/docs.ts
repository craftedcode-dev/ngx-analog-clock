import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalogClockComponent, AnalogClockConfig } from 'ngx-analog-clock';

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
  example?: string;
}

interface ApiSection {
  title: string;
  properties: ApiProperty[];
}

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [CommonModule, AnalogClockComponent],
  templateUrl: './docs.html',
  styleUrl: './docs.scss'
})
export class Docs {
  activeSection: string = 'getting-started';

  timezones = [
    { name: 'New York', tz: 'America/New_York' },
    { name: 'London', tz: 'Europe/London' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' },
    { name: 'Sydney', tz: 'Australia/Sydney' }
  ];

  basicConfig: AnalogClockConfig = {
    size: 200,
    theme: 'light'
  };

  themeExample: AnalogClockConfig = {
    size: 180,
    theme: 'dark'
  };

  timezoneExample: AnalogClockConfig = {
    size: 180,
    timezone: 'America/New_York',
    label: {
      text: 'New York',
      position: 'bottom'
    }
  };

  customColorsExample: AnalogClockConfig = {
    size: 180,
    theme: 'custom',
    customColors: {
      hands: {
        hour: '#3b82f6',
        minute: '#60a5fa',
        second: '#93c5fd'
      },
      markers: {
        hour: '#1e40af',
        minute: '#3b82f6'
      },
      center: {
        dot: '#1e40af',
        ring: '#3b82f6'
      },
      background: '#ffffff',
      border: '#e0e7ff'
    }
  };

  digitalDisplayExample: AnalogClockConfig = {
    size: 200,
    theme: 'dark',
    digitalDisplay: {
      enabled: true,
      format: '24h',
      showSeconds: true,
      color: '#3c3c3cff'
    }
  };

  apiSections: ApiSection[] = [
    {
      title: 'Basic Properties',
      properties: [
        {
          name: 'size',
          type: 'number',
          default: '300',
          description: 'Clock diameter in pixels. Determines the overall size of the clock.',
          example: '200'
        },
        {
          name: 'theme',
          type: "'light' | 'dark' | 'custom'",
          default: "'light'",
          description: 'Pre-built theme. Use "custom" for full color control.',
          example: "'dark'"
        },
        {
          name: 'timezone',
          type: 'string',
          default: "'local'",
          description: 'IANA timezone string (e.g., "America/New_York"). Use "local" for system timezone.',
          example: "'Europe/Paris'"
        },
        {
          name: 'time',
          type: 'Date',
          default: 'undefined',
          description: 'Custom time to display. When set, clock shows this time instead of current time. Perfect for countdowns and timers.',
          example: 'new Date()'
        }
      ]
    },
    {
      title: 'Hands Configuration',
      properties: [
        {
          name: 'hands.hour.length',
          type: 'number',
          default: '0.55',
          description: 'Hour hand length as a fraction of clock radius (0.1 - 0.9).',
          example: '0.6'
        },
        {
          name: 'hands.hour.width',
          type: 'number',
          default: '6',
          description: 'Hour hand width in pixels.',
          example: '8'
        },
        {
          name: 'hands.hour.show',
          type: 'boolean',
          default: 'true',
          description: 'Show or hide hour hand.',
          example: 'true'
        },
        {
          name: 'hands.minute.length',
          type: 'number',
          default: '0.7',
          description: 'Minute hand length as a fraction of clock radius (0.1 - 0.9).',
          example: '0.75'
        },
        {
          name: 'hands.minute.width',
          type: 'number',
          default: '6',
          description: 'Minute hand width in pixels.',
          example: '6'
        },
        {
          name: 'hands.minute.show',
          type: 'boolean',
          default: 'true',
          description: 'Show or hide minute hand.',
          example: 'true'
        },
        {
          name: 'hands.second.length',
          type: 'number',
          default: '0.8',
          description: 'Second hand length as a fraction of clock radius (0.1 - 0.9).',
          example: '0.85'
        },
        {
          name: 'hands.second.width',
          type: 'number',
          default: '4',
          description: 'Second hand width in pixels.',
          example: '3'
        },
        {
          name: 'hands.second.show',
          type: 'boolean',
          default: 'true',
          description: 'Show or hide second hand.',
          example: 'false'
        },
        {
          name: 'hands.smooth',
          type: 'boolean',
          default: 'true',
          description: 'Enable smooth 60fps second hand animation. When false, second hand ticks.',
          example: 'true'
        }
      ]
    },
    {
      title: 'Display Configuration',
      properties: [
        {
          name: 'display.markers',
          type: "'lines' | 'numbers' | 'dots' | 'lines-numbers' | 'dots-numbers' | 'none'",
          default: "'lines'",
          description: 'Type of hour markers: lines (traditional), dots (circular), numbers (1-12), lines-numbers (lines + cardinal numbers), dots-numbers (dots + cardinal numbers), or none.',
          example: "'dots-numbers'"
        },
        {
          name: 'display.numberStyle',
          type: "'arabic' | 'roman'",
          default: "'arabic'",
          description: 'Number style when markers includes numbers. Arabic (1-12) or Roman numerals (I-XII).',
          example: "'roman'"
        },
        {
          name: 'display.showBorder',
          type: 'boolean',
          default: 'true',
          description: 'Show clock border/rim.',
          example: 'true'
        },
        {
          name: 'display.showInnerRing',
          type: 'boolean',
          default: 'true',
          description: 'Show inner decorative ring.',
          example: 'false'
        },
        {
          name: 'display.showCenterRing',
          type: 'boolean',
          default: 'true',
          description: 'Show ring around center dot where hands meet.',
          example: 'true'
        },
        {
          name: 'display.hourMarkerWidth',
          type: 'number',
          default: '3',
          description: 'Size of hour markers in pixels. Works for both lines (stroke width) and dots (radius). Range: 1-10.',
          example: '4'
        },
        {
          name: 'display.minuteMarkerWidth',
          type: 'number',
          default: '1',
          description: 'Size of minute markers in pixels. Works for both lines (stroke width) and dots (radius). Set to 0 to hide. Range: 0-5.',
          example: '1.5'
        },
        {
          name: 'display.borderWidth',
          type: 'number',
          default: '10',
          description: 'Clock border width in pixels (when showBorder is true).',
          example: '15'
        },
        {
          name: 'display.numberSize',
          type: 'number',
          default: '16',
          description: 'Font size of numbers in pixels (when markers includes numbers).',
          example: '18'
        },
        {
          name: 'display.numberWeight',
          type: "'light' | 'normal' | 'bold'",
          default: "'bold'",
          description: 'Font weight of numbers. Light (300), Normal (400), Bold (700).',
          example: "'normal'"
        }
      ]
    },
    {
      title: 'Custom Colors',
      properties: [
        {
          name: 'customColors.hands.hour',
          type: 'string',
          default: 'theme-dependent',
          description: 'Hour hand color (hex, rgb, or named color). Only applies when theme is "custom".',
          example: "'#3b82f6'"
        },
        {
          name: 'customColors.hands.minute',
          type: 'string',
          default: 'theme-dependent',
          description: 'Minute hand color. Only applies when theme is "custom".',
          example: "'#60a5fa'"
        },
        {
          name: 'customColors.hands.second',
          type: 'string',
          default: 'theme-dependent',
          description: 'Second hand color. Only applies when theme is "custom".',
          example: "'#ff6b6b'"
        },
        {
          name: 'customColors.markers.hour',
          type: 'string',
          default: 'theme-dependent',
          description: 'Hour markers color (works for both line and dot markers). Only applies when theme is "custom".',
          example: "'#1e40af'"
        },
        {
          name: 'customColors.markers.minute',
          type: 'string',
          default: 'theme-dependent',
          description: 'Minute markers color (works for both line and dot markers). Only applies when theme is "custom".',
          example: "'#3b82f6'"
        },
        {
          name: 'customColors.markers.numbers',
          type: 'string',
          default: 'theme-dependent',
          description: 'Numbers color (when markers includes numbers). Only applies when theme is "custom".',
          example: "'#1e293b'"
        },
        {
          name: 'customColors.center.dot',
          type: 'string',
          default: 'theme-dependent',
          description: 'Center dot color where hands meet. Only applies when theme is "custom".',
          example: "'#1e40af'"
        },
        {
          name: 'customColors.center.ring',
          type: 'string',
          default: 'theme-dependent',
          description: 'Center ring color (when showCenterRing is true). Only applies when theme is "custom".',
          example: "'#3b82f6'"
        },
        {
          name: 'customColors.background',
          type: 'string',
          default: 'theme-dependent',
          description: 'Clock face background color. Only applies when theme is "custom".',
          example: "'#ffffff'"
        },
        {
          name: 'customColors.border',
          type: 'string',
          default: 'theme-dependent',
          description: 'Clock border color (when showBorder is true). Only applies when theme is "custom".',
          example: "'#e0e7ff'"
        },
        {
          name: 'customColors.innerRing',
          type: 'string',
          default: 'theme-dependent',
          description: 'Inner ring color (when showInnerRing is true). Only applies when theme is "custom".',
          example: "'#dbeafe'"
        },
        {
          name: 'customColors.label',
          type: 'string',
          default: 'theme-dependent',
          description: 'Label text color. Only applies when theme is "custom".',
          example: "'#1e40af'"
        },
        {
          name: 'customColors.backgroundGradient.type',
          type: "'linear' | 'radial'",
          default: 'undefined',
          description: 'Gradient type for background. When set, overrides background solid color.',
          example: "'radial'"
        },
        {
          name: 'customColors.backgroundGradient.start',
          type: 'string',
          default: 'undefined',
          description: 'Gradient start color.',
          example: "'#667eea'"
        },
        {
          name: 'customColors.backgroundGradient.end',
          type: 'string',
          default: 'undefined',
          description: 'Gradient end color.',
          example: "'#764ba2'"
        },
        {
          name: 'customColors.backgroundGradient.angle',
          type: 'number',
          default: '45',
          description: 'Gradient angle in degrees (only for linear gradients).',
          example: '135'
        }
      ]
    },
    {
      title: 'Digital Display',
      properties: [
        {
          name: 'digitalDisplay.enabled',
          type: 'boolean',
          default: 'false',
          description: 'Enable digital time display below the analog clock.',
          example: 'true'
        },
        {
          name: 'digitalDisplay.format',
          type: "'12h' | '24h'",
          default: "'24h'",
          description: 'Time format for digital display - 12-hour with AM/PM or 24-hour.',
          example: "'12h'"
        },
        {
          name: 'digitalDisplay.showSeconds',
          type: 'boolean',
          default: 'true',
          description: 'Show seconds in digital time display.',
          example: 'false'
        },
        {
          name: 'digitalDisplay.showDate',
          type: 'boolean',
          default: 'false',
          description: 'Show date below digital time (e.g., "Dec 4, 2025").',
          example: 'true'
        },
        {
          name: 'digitalDisplay.color',
          type: 'string',
          default: 'theme-dependent',
          description: 'Custom color for digital display text. Only applies when theme is "custom".',
          example: "'#3b82f6'"
        }
      ]
    },
    {
      title: 'Label',
      properties: [
        {
          name: 'label.text',
          type: 'string',
          default: 'undefined',
          description: 'Label text to display on clock (e.g., city name, timezone). When empty, no label is shown.',
          example: "'New York'"
        },
        {
          name: 'label.position',
          type: "'top' | 'bottom'",
          default: "'bottom'",
          description: 'Label position relative to clock center.',
          example: "'top'"
        }
      ]
    }
  ];

  scrollToSection(sectionId: string): void {
    this.activeSection = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}