# ngx-analog-clock

A beautiful, customizable analog clock component for Angular applications with timezone support, custom themes, and extensive styling options.

[![npm version](https://badge.fury.io/js/%40craftedcode-dev%2Fngx-analog-clock.svg)](https://www.npmjs.com/package/@craftedcode-dev/ngx-analog-clock)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🎨 Demo

**[Live Demo & Interactive Playground](https://craftedcode-dev.github.io/ngx-analog-clock/)**

Explore 24+ pre-built designs and create your own custom clock with our interactive playground.

## ✨ Features

- 🎨 **Multiple Themes** - Light, Dark, and fully Custom themes
- 🌍 **Timezone Support** - Display time from any timezone using IANA strings
- ⏱️ **Custom Time Control** - Perfect for timers and countdowns
- 🎨 **Full Customization** - Colors, gradients, sizes, and styles
- 📱 **Responsive** - Works seamlessly on all screen sizes
- ⚡ **Smooth Animations** - 60 FPS second hand movement
- 🎯 **TypeScript** - Full type definitions included
- 📦 **Lightweight** - Optimized performance with minimal bundle size

## 📦 Installation

```bash
npm install @craftedcode-dev/ngx-analog-clock
```

## 🚀 Quick Start

**1. Import the component:**

```typescript
import { Component } from '@angular/core';
import { AnalogClockComponent } from '@craftedcode-dev/ngx-analog-clock';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AnalogClockComponent],
  template: '<ngx-analog-clock></ngx-analog-clock>'
})
export class AppComponent {}
```

**2. Basic customization:**

```typescript
import { AnalogClockConfig } from '@craftedcode-dev/ngx-analog-clock';

export class MyComponent {
  clockConfig: AnalogClockConfig = {
    size: 300,
    theme: 'dark'
  };
}
```

```html
<ngx-analog-clock [config]="clockConfig"></ngx-analog-clock>
```

## 📚 API Reference

### Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `number` | `300` | Clock diameter in pixels |
| `theme` | `'light' \| 'dark' \| 'custom'` | `'light'` | Pre-built theme or custom for full control |
| `timezone` | `string` | `'local'` | IANA timezone string (e.g., 'America/New_York') |
| `time` | `Date` | `undefined` | Custom time to display (for timers/countdowns) |

### Hands Configuration

Configure via `config.hands`:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `hour.length` | `number` | `0.55` | Length as fraction of radius (0.1-0.9) |
| `hour.width` | `number` | `6` | Width in pixels |
| `hour.show` | `boolean` | `true` | Show/hide hour hand |
| `minute.length` | `number` | `0.7` | Length as fraction of radius (0.1-0.9) |
| `minute.width` | `number` | `6` | Width in pixels |
| `minute.show` | `boolean` | `true` | Show/hide minute hand |
| `second.length` | `number` | `0.8` | Length as fraction of radius (0.1-0.9) |
| `second.width` | `number` | `4` | Width in pixels |
| `second.show` | `boolean` | `true` | Show/hide second hand |
| `smooth` | `boolean` | `true` | Enable smooth animation |

### Display Configuration

Configure via `config.display`:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `markers` | `'lines' \| 'numbers' \| 'dots' \| 'lines-numbers' \| 'dots-numbers' \| 'none'` | `'lines'` | Hour markers: lines (traditional), dots (circular), numbers (1-12), lines-numbers (lines + cardinal numbers), dots-numbers (dots + cardinal numbers), or none |
| `numberStyle` | `'arabic' \| 'roman'` | `'arabic'` | Number style: Arabic (1-12) or Roman numerals (I-XII) |
| `showBorder` | `boolean` | `true` | Show clock border |
| `showInnerRing` | `boolean` | `true` | Show inner decorative ring |
| `showCenterRing` | `boolean` | `true` | Show ring around center |
| `hourMarkerWidth` | `number` | `3` | Size of hour markers in pixels. Works for both lines (stroke width) and dots (radius) |
| `minuteMarkerWidth` | `number` | `1` | Size of minute markers in pixels. Works for both lines (stroke width) and dots (radius) |
| `borderWidth` | `number` | `10` | Border width in pixels |
| `numberSize` | `number` | `16` | Font size for numbers |
| `numberWeight` | `'light' \| 'normal' \| 'bold'` | `'bold'` | Font weight for numbers |

### Custom Colors

Configure via `config.customColors` (only applies when `theme` is `'custom'`):

| Property | Type | Description |
|----------|------|-------------|
| `hands.hour` | `string` | Hour hand color |
| `hands.minute` | `string` | Minute hand color |
| `hands.second` | `string` | Second hand color |
| `markers.hour` | `string` | Hour markers color (works for both line and dot markers) |
| `markers.minute` | `string` | Minute markers color (works for both line and dot markers) |
| `markers.numbers` | `string` | Numbers color |
| `center.dot` | `string` | Center dot color |
| `center.ring` | `string` | Center ring color |
| `background` | `string` | Clock face background |
| `border` | `string` | Clock border color |
| `innerRing` | `string` | Inner ring color |
| `label` | `string` | Label text color |

### Gradient Backgrounds

Configure via `config.customColors.backgroundGradient`:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'linear' \| 'radial'` | - | Gradient type |
| `start` | `string` | - | Start color |
| `end` | `string` | - | End color |
| `angle` | `number` | `45` | Angle in degrees (linear only) |

### Digital Display

Configure via `config.digitalDisplay`:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enabled` | `boolean` | `false` | Show digital time display |
| `format` | `'12h' \| '24h'` | `'24h'` | Time format |
| `showSeconds` | `boolean` | `true` | Show seconds in digital display |
| `showDate` | `boolean` | `false` | Show date in digital display |
| `color` | `string` | theme-dependent | Custom color for digital display text |

### Label

Configure via `config.label`:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | `string` | - | Label text (e.g., timezone name) |
| `position` | `'top' \| 'bottom'` | `'bottom'` | Label position |

## 💡 Usage Examples

### Timezone Clock

```typescript
clockConfig: AnalogClockConfig = {
  size: 250,
  timezone: 'America/New_York',
  label: {
    text: 'New York',
    position: 'bottom'
  },
  digitalDisplay: {
    enabled: true,
    format: '12h'
  }
};
```

### Modern Dot Markers

```typescript
clockConfig: AnalogClockConfig = {
  size: 250,
  theme: 'custom',
  display: {
    markers: 'dots-numbers',
    hourMarkerWidth: 5,
    numberWeight: 'bold'
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
      hour: '#075985',
      numbers: '#0c4a6e'
    }
  }
};
```

### Custom Theme

```typescript
clockConfig: AnalogClockConfig = {
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
    background: '#ffffff',
    border: '#e0e7ff'
  }
};
```

### Gradient Background

```typescript
clockConfig: AnalogClockConfig = {
  theme: 'custom',
  customColors: {
    backgroundGradient: {
      type: 'radial',
      start: '#667eea',
      end: '#764ba2'
    },
    hands: {
      hour: '#ffffff',
      minute: '#ffffff',
      second: '#fbbf24'
    }
  }
};
```

### Timer/Countdown

```typescript
export class TimerComponent implements OnInit {
  customTime: Date = new Date();
  
  clockConfig: AnalogClockConfig = {
    size: 300,
    theme: 'dark'
  };

  ngOnInit() {
    // Update every second
    setInterval(() => {
      this.customTime = new Date(this.customTime.getTime() + 1000);
    }, 1000);
  }
}
```

```html
<ngx-analog-clock 
  [time]="customTime" 
  [config]="clockConfig">
</ngx-analog-clock>
```

## 📖 Documentation

For detailed documentation and interactive playground, visit:

**[Full Documentation](https://craftedcode-dev.github.io/ngx-analog-clock/docs)**

## 🛠️ Requirements

- Angular 17+
- TypeScript 5.0+

## 📄 License

MIT © 2025 [craftedcode-dev](https://github.com/craftedcode-dev)