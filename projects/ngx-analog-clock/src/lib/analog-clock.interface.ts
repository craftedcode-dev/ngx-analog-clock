export type ClockTheme = 'light' | 'dark' | 'custom';
export type ClockMarkers = 'lines' | 'numbers' | 'both' | 'none';
export type LabelPosition = 'top' | 'bottom';
export type TimeFormat = '12h' | '24h';
export type NumberStyle = 'arabic' | 'roman';
export type NumberWeight = 'light' | 'normal' | 'bold';

export interface IndividualHandConfig {
	/** Show this hand (default: true) */
	show?: boolean;

	/** Hand length as percentage of radius (0-1, default varies by hand) */
	length?: number;

	/** Hand width in pixels (default varies by size, min/max enforced) */
	width?: number;
}

export interface HandConfig {
	/** Hour hand configuration */
	hour?: IndividualHandConfig;

	/** Minute hand configuration */
	minute?: IndividualHandConfig;

	/** Second hand configuration */
	second?: IndividualHandConfig;

	/** Enable smooth animation for clock hands (default: false) */
	smooth?: boolean;
}

export interface DisplayConfig {
	/** Marker type - lines, numbers, both, none (default: 'lines') */
	markers?: ClockMarkers;

	/** Show border/glow ring (default: true) */
	showBorder?: boolean;

	/** Border width in pixels (min: 1, max: 10, default: responsive based on size) */
	borderWidth?: number;

	/** Show inner ring (default: false) */
	showInnerRing?: boolean;

	/** Show center ring around center dot (default: false) */
	showCenterRing?: boolean;

	/** Number style - arabic (1,2,3) or roman (I,II,III) (default: 'arabic') */
	numberStyle?: NumberStyle;

	/** Number font size in pixels (min: 8, max: 32, default: responsive 10/14/16) */
	numberSize?: number;

	/** Number font weight - light (300), normal (400), bold (700) (default: 'normal') */
	numberWeight?: NumberWeight;

	/** Hour marker line width in pixels (min: 1, max: 10, default: responsive 2-3) */
	hourMarkerWidth?: number;

	/** Minute marker line width in pixels (min: 0 to hide, max: 5, default: 1) */
	minuteMarkerWidth?: number;
}

export interface LabelConfig {
	/** Label text to display on clock */
	text: string;

	/** Label position - top or bottom (default: 'top') */
	position?: LabelPosition;
}

export interface DigitalDisplayConfig {
	/** Enable digital time display (default: false) */
	enabled: boolean;

	/** Time format - 12h or 24h (default: '24h') */
	format?: TimeFormat;

	/** Show seconds in digital time (default: true) */
	showSeconds?: boolean;

	/** Show date below time (default: false) */
	showDate?: boolean;

	/** Custom color for digital display (optional) */
	color?: string;
}

/** Background gradient configuration */
export interface GradientConfig {
	/** Gradient type - linear (directional) or radial (center to edges) */
	type?: 'linear' | 'radial';

	/** Start color (center color for radial gradients) */
	start: string;

	/** End color (edge color for radial gradients) */
	end: string;

	/** Gradient angle in degrees (0-360, only for linear gradients, default: 135) */
	angle?: number;
}

export interface ClockCustomColors {
	/** Clock background color (solid) */
	background?: string;

	/** Background gradient (overrides solid background if provided) */
	backgroundGradient?: GradientConfig;

	/** Border/glow ring color */
	border?: string;

	/** Hand colors */
	hands?: {
	hour?: string;
	minute?: string;
	second?: string;
	};

	/** Marker colors */
	markers?: {
	hour?: string;
	minute?: string;
	numbers?: string;
	};

	/** Center dot colors */
	center?: {
	dot?: string;
	ring?: string;
	};

	/** Inner ring color */
	innerRing?: string;

	/** Label text color */
	label?: string;
}

export interface AnalogClockConfig {
	/** Clock size in pixels (min: 100, default: 200) */
	size?: number;

	/** Clock theme - light, dark or custom (default: 'light') */
	theme?: ClockTheme;

	/** Timezone - 'local' or IANA timezone string like 'Europe/Belgrade' (default: 'local') */
	timezone?: string;

	/** Hand configuration */
	hands?: HandConfig;

	/** Display elements configuration */
	display?: DisplayConfig;

	/** Custom colors - works with any theme! */
	customColors?: ClockCustomColors;

	/** Label configuration (optional) */
	label?: LabelConfig;

	/** Digital display configuration (optional) */
	digitalDisplay?: DigitalDisplayConfig;

	/** Manual time mode - if provided, clock shows this time instead of realtime (optional) */
	time?: Date;

	/** Custom CSS class to apply to the clock container for advanced styling (optional) */
	customClass?: string;
}