/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalogClockComponent } from './analog-clock.component';
import { AnalogClockConfig } from './analog-clock.interface';

describe('AnalogClockComponent', () => {
  
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AnalogClockComponent]
		}).compileComponents();
	});

	function createComponent(config: AnalogClockConfig): ComponentFixture<AnalogClockComponent> {
		const fixture = TestBed.createComponent(AnalogClockComponent);
		fixture.componentInstance.config = config;
		fixture.detectChanges();
		return fixture;
	}

	it('should create', () => {
		const fixture = createComponent({ size: 200, theme: 'light', timezone: 'local' });
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should render SVG element', () => {
		const fixture = createComponent({ size: 200, theme: 'light', timezone: 'local' });
		expect(fixture.nativeElement.querySelector('svg.analog-clock')).toBeTruthy();
	});

	it('should apply light theme', () => {
		const fixture = createComponent({ size: 200, theme: 'light', timezone: 'local' });
		expect(fixture.nativeElement.querySelector('svg.light-theme')).toBeTruthy();
	});

	it('should apply dark theme', () => {
		const fixture = createComponent({ size: 200, theme: 'dark', timezone: 'local' });
		expect(fixture.nativeElement.querySelector('svg.dark-theme')).toBeTruthy();
	});

	it('should apply custom theme', () => {
		const fixture = createComponent({ size: 200, theme: 'custom', timezone: 'local' });
		expect(fixture.nativeElement.querySelector('svg.custom-theme')).toBeTruthy();
	});

	it('should render all hands by default', () => {
		const fixture = createComponent({ size: 200, theme: 'light', timezone: 'local' });
		expect(fixture.nativeElement.querySelector('.hour-hand')).toBeTruthy();
		expect(fixture.nativeElement.querySelector('.minute-hand')).toBeTruthy();
		expect(fixture.nativeElement.querySelector('.second-hand')).toBeTruthy();
	});

	it('should hide hour hand', () => {
		const fixture = createComponent({ 
			size: 200, theme: 'light', timezone: 'local',
			hands: { hour: { show: false } }
		});
		expect(fixture.nativeElement.querySelector('.hour-hand')).toBeFalsy();
	});

	it('should hide minute hand', () => {
		const fixture = createComponent({ 
			size: 200, theme: 'light', timezone: 'local',
			hands: { minute: { show: false } }
		});
		expect(fixture.nativeElement.querySelector('.minute-hand')).toBeFalsy();
	});

	it('should hide second hand', () => {
		const fixture = createComponent({ 
			size: 200, theme: 'light', timezone: 'local',
			hands: { second: { show: false } }
		});
		expect(fixture.nativeElement.querySelector('.second-hand')).toBeFalsy();
	});

	it('should render hour markers with lines', () => {
		const fixture = createComponent({ 
			size: 200, theme: 'light', timezone: 'local',
			display: { markers: 'lines' }
		});
		expect(fixture.nativeElement.querySelectorAll('.hour-marker').length).toBeGreaterThan(0);
	});

	it('should render numbers markers', () => {
		const fixture = createComponent({ 
			size: 200, theme: 'light', timezone: 'local',
			display: { markers: 'numbers' }
		});
		expect(fixture.nativeElement.querySelectorAll('.hour-number').length).toBeGreaterThan(0);
	});

	it('should render both markers and numbers', () => {
		const fixture = createComponent({ 
			size: 200, theme: 'light', timezone: 'local',
			display: { markers: 'both' }
		});
		expect(fixture.nativeElement.querySelectorAll('.hour-marker').length).toBeGreaterThan(0);
		expect(fixture.nativeElement.querySelectorAll('.hour-number').length).toBeGreaterThan(0);
	});

	it('should render border when enabled', () => {
		const fixture = createComponent({ 
			size: 200, theme: 'light', timezone: 'local',
			display: { showBorder: true }
		});
		expect(fixture.nativeElement.querySelector('.glow-ring')).toBeTruthy();
	});

	it('should render inner ring when enabled', () => {
		const fixture = createComponent({ 
			size: 200, theme: 'light', timezone: 'local',
			display: { showInnerRing: true }
		});
		expect(fixture.nativeElement.querySelector('.inner-ring')).toBeTruthy();
	});

	it('should render center ring when enabled', () => {
		const fixture = createComponent({ 
			size: 200, theme: 'light', timezone: 'local',
			display: { showCenterRing: true }
		});
		expect(fixture.nativeElement.querySelector('.center-dot-outer')).toBeTruthy();
	});

	it('should render digital display', () => {
		const fixture = createComponent({ 
			size: 200, theme: 'light', timezone: 'local',
			digitalDisplay: { enabled: true }
		});
		expect(fixture.nativeElement.querySelector('.digital-display')).toBeTruthy();
	});

	it('should show date in digital display', () => {
		const fixture = createComponent({ 
			size: 200, theme: 'light', timezone: 'local',
			digitalDisplay: { enabled: true, showDate: true }
		});
		expect(fixture.nativeElement.querySelector('.digital-date')).toBeTruthy();
	});

	it('should render label', () => {
		const fixture = createComponent({ 
			size: 200, theme: 'light', timezone: 'local',
			label: { text: 'TEST', position: 'top' }
		});
		const label = fixture.nativeElement.querySelector('.clock-label');
		expect(label).toBeTruthy();
		expect(label.textContent.trim()).toBe('TEST');
	});

	it('should render linear gradient', () => {
		const fixture = createComponent({ 
			size: 200, theme: 'light', timezone: 'local',
			customColors: {
			backgroundGradient: { type: 'linear', start: '#fff', end: '#000' }
			}
		});
		expect(fixture.nativeElement.querySelector('linearGradient')).toBeTruthy();
	});

	it('should render radial gradient', () => {
		const fixture = createComponent({ 
			size: 200, theme: 'light', timezone: 'local',
			customColors: {
			backgroundGradient: { type: 'radial', start: '#fff', end: '#000' }
			}
		});
		expect(fixture.nativeElement.querySelector('radialGradient')).toBeTruthy();
	});

	it('should accept custom time', () => {
		const fixture = createComponent({ size: 200, theme: 'light', timezone: 'local' });
		const customTime = new Date(2024, 0, 1, 12, 0, 0);
		fixture.componentInstance.time = customTime;
		fixture.detectChanges();
		expect(fixture.componentInstance.time).toBe(customTime);
	});

	it('should apply smooth class when enabled', () => {
		const fixture = createComponent({ 
			size: 200, theme: 'light', timezone: 'local',
			hands: { smooth: true }
		});
		expect(fixture.nativeElement.querySelector('.hour-hand.smooth')).toBeTruthy();
	});

	it('should have correct size', () => {
		const fixture = createComponent({ size: 300, theme: 'light', timezone: 'local' });
		const svg = fixture.nativeElement.querySelector('svg');
		expect(svg.getAttribute('width')).toBe('300');
		expect(svg.getAttribute('height')).toBe('300');
	});

	it('should cleanup on destroy', () => {
		const fixture = createComponent({ size: 200, theme: 'light', timezone: 'local' });
		fixture.componentInstance.ngOnDestroy();
		expect(fixture.componentInstance).toBeTruthy();
	});
});