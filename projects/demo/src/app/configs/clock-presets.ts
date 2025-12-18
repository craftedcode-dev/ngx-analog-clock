import { AnalogClockConfig } from 'ngx-analog-clock';

// ========== THEMES (3) ==========
const lightTheme: AnalogClockConfig = { theme: 'light' };
const darkTheme: AnalogClockConfig = { theme: 'dark' };

const customTheme: AnalogClockConfig = {
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
};

// ========== CLASSIC (12) ==========
const minimalSwiss: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.65, width: 4 },
		minute: { length: 0.75, width: 3 },
		second: { length: 0.90, width: 1 },
		smooth: false
	},
	display: {
		markers: 'lines',
		showBorder: true,
		showInnerRing: false,
		showCenterRing: false,
		hourMarkerWidth: 3,
		minuteMarkerWidth: 1,
		borderWidth: 4
	},
	customColors: {
		background: '#ffffff',
		border: '#000000',
		hands: {
			hour: '#000000',
			minute: '#000000',
			second: '#dc2626'
		},
		markers: {
			hour: '#000000',
			minute: '#404040'
		},
		center: {
			dot: '#dc2626'
		}
	}
};

const vintageRailway: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.55, width: 4 },
		minute: { length: 0.75, width: 3 },
		second: { length: 0.9, width: 1 },
		smooth: false
	},
	display: {
		markers: 'lines-numbers',
		numberStyle: 'arabic',
		showBorder: true,
		showInnerRing: false,
		showCenterRing: true,
		hourMarkerWidth: 3,
		minuteMarkerWidth: 1,
		borderWidth: 8,
		numberSize: 16,
		numberWeight: 'normal'
	},
	customColors: {
		background: '#ffffff',
		border: '#0f172a',
		hands: {
			hour: '#1e293b',
			minute: '#334155',
			second: '#dc2626'
		},
		markers: {
			hour: '#1e293b',
			minute: '#475569',
			numbers: '#0f172a'
		},
		center: {
			dot: '#dc2626',
			ring: '#1e293b'
		},
		label: '#0f172a'
	}
};

const classicSilver: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.7, width: 4 },
		minute: { length: 0.8, width: 3 },
		second: { length: 0.85, width: 2 },
		smooth: false
	},
	display: {
		markers: 'dots',
		showBorder: false,
		showInnerRing: false,
		showCenterRing: false
	},
	customColors: {
		background: '#f8fafc',
		hands: {
			hour: '#475569',
			minute: '#64748b',
			second: '#ef4444'
		},
		markers: {
			hour: '#94a3b8',
			minute: '#94a3b8'
		},
		center: {
			dot: '#ef4444'
		}
	}
};

const minimalZen: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.55, width: 3 },
		minute: { length: 0.75, width: 2 },
		second: { length: 0.85, width: 1 },
		smooth: false
	},
	display: {
		markers: 'dots',
		showBorder: false,
		showInnerRing: false,
		showCenterRing: false,
		hourMarkerWidth: 3,
		minuteMarkerWidth: 0
	},
	customColors: {
		background: '#fef9f3',
		hands: {
			hour: '#292524',
			minute: '#44403c',
			second: '#78716c'
		},
		markers: {
			hour: '#a8a29e'
		},
		center: {
			dot: '#78716c'
		}
	}
};

const elegantDiamond: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.65, width: 4 },
		minute: { length: 0.7, width: 3 },
		second: { length: 0.9, width: 1 },
		smooth: false
	},
	display: {
		markers: 'lines',
		showBorder: true,
		showInnerRing: true,
		showCenterRing: true,
		hourMarkerWidth: 2,
		minuteMarkerWidth: 1,
		borderWidth: 10
	},
	customColors: {
		backgroundGradient: {
			type: 'radial',
			start: '#f1f5f9',
			end: '#cbd5e1'
		},
		border: '#475569',
		hands: {
			hour: '#1e293b',
			minute: '#334155',
			second: '#3b82f6'
		},
		markers: {
			hour: '#64748b',
			minute: '#94a3b8'
		},
		center: {
			dot: '#3b82f6',
			ring: '#475569'
		},
		innerRing: '#94a3b8'
	}
};

const classicGreen: AnalogClockConfig = {
	theme: 'custom',
	timezone: 'local',
	display: {
		markers: 'numbers',
		showCenterRing: true
	},
	hands: {
		hour: { length: 0.65, width: 4 },
		minute: { length: 0.7, width: 3 },
		second: { length: 0.75, width: 2 },
		smooth: false
	},
	customColors: {
		background: '#e8f5e9',
		border: '#4caf50',
		hands: {
			hour: '#2e7d32',
			minute: '#388e3c',
			second: '#66bb6a'
		},
		markers: {
			hour: '#1b5e20'
		},
		center: {
			dot: '#4caf50',
			ring: '#4caf50',
		}
	}
};

const classicEmerald: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.6, width: 4 },
		minute: { length: 0.8, width: 3 },
		second: { length: 0.9, width: 1 },
		smooth: false
	},
	display: {
		markers: 'lines',
		showBorder: true,
		showInnerRing: true,
		showCenterRing: false,
		hourMarkerWidth: 3,
		minuteMarkerWidth: 1,
		borderWidth: 6
	},
	customColors: {
		background: '#f0fdf4',
		border: '#065f46',
		hands: {
			hour: '#064e3b',
			minute: '#047857',
			second: '#fbbf24'
		},
		markers: {
			hour: '#065f46',
			minute: '#34d399'
		},
		center: {
			dot: '#fbbf24',
			ring: '#065f46'
		},
		innerRing: '#10b981'
	}
};

const classicBlackWhite: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.55, width: 5 },
		minute: { length: 0.75, width: 4 },
		second: { length: 0.9, width: 2 },
		smooth: false
	},
	display: {
		markers: 'lines-numbers',
		numberStyle: 'arabic',
		showBorder: true,
		showInnerRing: false,
		showCenterRing: true,
		hourMarkerWidth: 4,
		minuteMarkerWidth: 2,
		borderWidth: 8,
		numberSize: 18,
		numberWeight: 'bold'
	},
	customColors: {
		background: '#4a5240',
		border: '#2d3021',
		hands: {
			hour: '#e8e5d3',
			minute: '#d9d4b8',
			second: '#ff6600'
		},
		markers: {
			hour: '#d9d4b8',
			minute: '#8a8a6b',
			numbers: '#e8e5d3'
		},
		center: {
			dot: '#ff6600',
			ring: '#2d3021'
		},
		label: '#e8e5d3'
	}
};

const classicPink: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.6, width: 3 },
		minute: { length: 0.75, width: 2 },
		second: { length: 0.85, width: 1 },
		smooth: false
	},
	display: {
		markers: 'lines',
		showBorder: false,
		showInnerRing: false,
		showCenterRing: false
	},
	customColors: {
		background: '#fdf2f8',
		hands: {
			hour: '#be185d',
			minute: '#db2777',
			second: '#ec4899'
		},
		markers: {
			hour: '#be185d',
			minute: '#be185d'
		},
		center: {
			dot: '#be185d'
		}
	}
};

const classicBlue: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.6, width: 4 },
		minute: { length: 0.75, width: 3 },
		second: { length: 0.9, width: 1 },
		smooth: false
	},
	display: {
		markers: 'lines-numbers',
		numberStyle: 'arabic',
		showBorder: true,
		showInnerRing: true,
		showCenterRing: true
	},
	label: {
		text: 'ARCTIC',
		position: 'top'
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
			hour: '#075985'
		},
		center: {
			dot: '#e11d48',
			ring: '#0ea5e9'
		},
		innerRing: '#38bdf8',
		label: '#0369a1'
	}
};

const classicOrange: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.6, width: 4 },
		minute: { length: 0.7, width: 3 },
		second: { length: 0.75, width: 2 },
		smooth: false
	},
	display: {
		markers: 'numbers',
		numberStyle: 'roman',
		showBorder: true,
		showInnerRing: false,
		showCenterRing: true
	},
	customColors: {
		background: '#fffbeb',
		border: '#f59e0b',
		hands: {
			hour: '#92400e',
			minute: '#d97706',
			second: '#dc2626'
		},
		markers: {
			hour: '#78350f',
			numbers: '#92400e'
		},
		center: {
			dot: '#dc2626',
			ring: '#f59e0b'
		}
	}
};

const classicBrown: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.6, width: 4 },
		minute: { length: 0.75, width: 3 },
		second: { length: 0.9, width: 1 },
		smooth: false
	},
	display: {
		markers: 'lines-numbers',
		numberStyle: 'roman',
		showBorder: true,
		showInnerRing: true,
		showCenterRing: false
	},
	label: {
		text: 'VINTAGE',
		position: 'bottom'
	},
	customColors: {
		background: '#fef3c7',
		border: '#92400e',
		hands: {
			hour: '#78350f',
			minute: '#78350f',
			second: '#dc2626'
		},
		markers: {
			hour: '#78350f',
			numbers: '#451a03'
		},
		center: {
			dot: '#92400e'
		},
		innerRing: '#d97706',
		label: '#78350f'
	}
};

// ========== MODERN (13) ==========
const modernAzureDepths: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.6, width: 6 },
		minute: { length: 0.8, width: 5 },
		second: { length: 0.95, width: 2 },
		smooth: true
	},
	display: {
		markers: 'lines',
		showBorder: true,
		showInnerRing: true,
		showCenterRing: true,
		hourMarkerWidth: 6,
		minuteMarkerWidth: 3,
		borderWidth: 10
	},
	customColors: {
		backgroundGradient: {
			type: 'radial',
			start: '#38bdf8',
			end: '#0c4a6e',
		},
		border: '#fbbf24',
		hands: {
			hour: '#fef3c7',
			minute: '#fde68a',
			second: '#f43f5e'
		},
		markers: {
			hour: '#fbbf24',
			minute: '#fbbf24'
		},
		center: {
			dot: '#f43f5e',
			ring: '#fbbf24'
		},
		innerRing: '#0284c7',
		label: '#fef3c7'
	}
};

const modernEmeraldForest: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.6, width: 6 },
		minute: { length: 0.8, width: 5 },
		second: { length: 0.95, width: 2 },
		smooth: true
	},
	display: {
		markers: 'none',
		showBorder: true,
		showInnerRing: true,
		showCenterRing: false,
		borderWidth: 10
	},
	label: {
		text: 'FOREST',
		position: 'bottom'
	},
	customColors: {
		backgroundGradient: {
			type: 'linear',
			start: '#34d399',
			end: '#064e3b',
			angle: 135
		},
		border: '#fbbf24',
		hands: {
			hour: '#fef3c7',
			minute: '#fde68a',
			second: '#06b6d4'
		},
		center: {
			dot: '#06b6d4',
			ring: '#fbbf24'
		},
		innerRing: '#059669',
		label: '#fef3c7'
	}
};

const modernJadeMist: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.55, width: 5 },
		minute: { length: 0.75, width: 4 },
		second: { length: 0.9, width: 2 },
		smooth: true
	},
	display: {
		markers: 'dots-numbers',
		numberStyle: 'arabic',
		showBorder: true,
		showInnerRing: false,
		showCenterRing: true,
		hourMarkerWidth: 5,
		borderWidth: 8,
		numberSize: 14,
		numberWeight: 'normal'
	},
	customColors: {
		backgroundGradient: {
			type: 'radial',
			start: '#86efac',
			end: '#166534'
		},
		border: '#fbbf24',
		hands: {
			hour: '#fef3c7',
			minute: '#fde68a',
			second: '#f43f5e'
		},
		markers: {
			hour: '#4ade80',
			numbers: '#fef3c7'
		},
		center: {
			dot: '#f43f5e',
			ring: '#fbbf24'
		}
	}
};

const modernDeepOcean: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.6, width: 6 },
		minute: { length: 0.8, width: 5 },
		second: { length: 0.95, width: 2 },
		smooth: true
	},
	display: {
		markers: 'none',
		showBorder: false,
		showInnerRing: true,
		showCenterRing: true,
		borderWidth: 0
	},
	label: {
		text: 'DEEP OCEAN',
		position: 'bottom'
	},
	customColors: {
		backgroundGradient: {
			type: 'radial',
			start: '#0c4a6e',
			end: '#020617'
		},
		hands: {
			hour: '#e0f2fe',
			minute: '#bae6fd',
			second: '#fbbf24'
		},
		center: {
			dot: '#fbbf24',
			ring: '#0ea5e9'
		},
		innerRing: '#075985',
		label: '#e0f2fe'
	}
};

const modernAuroraBorealis: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.6, width: 6 },
		minute: { length: 0.8, width: 5 },
		second: { length: 0.95, width: 2 },
		smooth: true
	},
	display: {
		markers: 'none',
		showBorder: true,
		showInnerRing: true,
		showCenterRing: false,
		borderWidth: 8
	},
	customColors: {
		backgroundGradient: {
			type: 'linear',
			start: '#48c6ef',
			end: '#6f86d6',
			angle: 180
		},
		border: '#a8edea',
		hands: {
			hour: '#ffffff',
			minute: '#f0f8ff',
			second: '#fed766'
		},
		center: {
			dot: '#fed766',
			ring: '#a8edea'
		},
		innerRing: '#679dff'
	}
};

const modernIcebergBlue: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.6, width: 6 },
		minute: { length: 0.8, width: 5 },
		second: { length: 0.95, width: 2 },
		smooth: true
	},
	display: {
		markers: 'none',
		showBorder: true,
		showInnerRing: true,
		showCenterRing: false,
		borderWidth: 8
	},
	customColors: {
		backgroundGradient: {
			type: 'radial',
			start: '#d0efff',
			end: '#5fa8d3'
		},
		border: '#1b4965',
		hands: {
			hour: '#1b4965',
			minute: '#2c6e8f',
			second: '#ff006e'
		},
		center: {
			dot: '#ff006e',
			ring: '#1b4965'
		},
		innerRing: '#62b6cb'
	}
};

const modernNorthernLights: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.6, width: 8 },
		minute: { length: 0.8, width: 7 },
		second: { length: 0.95, width: 4 },
		smooth: true
	},
	display: {
		markers: 'none',
		showBorder: true,
		showInnerRing: false,
		showCenterRing: true,
		borderWidth: 12
	},
	customColors: {
		backgroundGradient: {
			type: 'linear',
			start: '#06ffa5',
			end: '#a855f7',
			angle: 225
		},
		border: '#fff',
		hands: {
			hour: '#ffffff',
			minute: '#f0f9ff',
			second: '#ffd60a'
		},
		center: {
			dot: '#ffd60a',
			ring: '#ffffff'
		},
		label: '#ffffff'
	}
};

const modernSakuraDream: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.55, width: 6 },
		minute: { length: 0.75, width: 5 },
		second: { length: 0.95, width: 2 },
		smooth: true
	},
	display: {
		markers: 'none',
		showBorder: true,
		showInnerRing: true,
		showCenterRing: false,
		borderWidth: 8
	},
	customColors: {
		backgroundGradient: {
			type: 'linear',
			start: '#ffd6e8',
			end: '#ff9eca',
			angle: 135
		},
		border: '#c9184a',
		hands: {
			hour: '#590d22',
			minute: '#800f2f',
			second: '#06d6a0'
		},
		center: {
			dot: '#06d6a0',
			ring: '#c9184a'
		},
		innerRing: '#ff4d8d'
	}
};

const modernMintChocolate: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.55, width: 5 },
		minute: { length: 0.75, width: 4 },
		second: { length: 0.9, width: 2 },
		smooth: true
	},
	display: {
		markers: 'dots-numbers',
		numberStyle: 'arabic',
		showBorder: true,
		showInnerRing: false,
		showCenterRing: true,
		hourMarkerWidth: 5,
		borderWidth: 8,
		numberSize: 14,
		numberWeight: 'normal'
	},
	customColors: {
		backgroundGradient: {
			type: 'radial',
			start: '#aaffa9',
			end: '#11ffbd',
			angle: 90
		},
		border: '#264653',
		hands: {
			hour: '#264653',
			minute: '#2a9d8f',
			second: '#e76f51'
		},
		markers: {
			hour: '#2a9d8f',
			numbers: '#264653'
		},
		center: {
			dot: '#e76f51',
			ring: '#264653'
		}
	}
};

const modernDarkBrutalist: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.55, width: 7 },
		minute: { length: 0.65, width: 7 },
		second: { length: 0.8, width: 5 },
		smooth: true
	},
	display: {
		markers: 'lines',
		hourMarkerWidth: 5,
		minuteMarkerWidth: 0,
		showBorder: false,
		showInnerRing: false,
		showCenterRing: false,
		borderWidth: 10
	},
	customColors: {
		backgroundGradient: {
			type: 'radial',
			start: '#404040',
			end: '#0a0a0a'
		},
		border: '#fbbf24',
		hands: {
			hour: '#ffffff',
			minute: '#ffffff',
			second: '#fbbf24'
		},
		markers: {
			hour: '#ffffff',
			minute: '#606060'
		},
		center: {
			dot: '#fbbf24',
			ring: '#ffffff'
		},
		innerRing: '#c1bebeff',
		label: '#080805ff'
	}
};

const modernMatrix: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.55, width: 7 },
		minute: { length: 0.65, width: 7 },
		second: { length: 0.8, width: 5 },
		smooth: true
	},
	display: {
		markers: 'lines',
		showInnerRing: true,
		showCenterRing: false,
		hourMarkerWidth: 5,
		minuteMarkerWidth: 2
	},
	customColors: {
		backgroundGradient: {
			type: 'radial',
			start: '#003300',
			end: '#000000'
		},
		border: '#00ff41',
		hands: {
			hour: '#00ff41',
			minute: '#00ff41',
			second: '#39ff14'
		},
		markers: {
			hour: '#00ff41',
			minute: '#009933'
		},
		center: {
			dot: '#39ff14',
			ring: '#00ff41'
		},
		innerRing: '#00ff41'
	}
};

const modernVaporwave: AnalogClockConfig = {
	theme: 'custom',
	hands: {
		hour: { length: 0.5, width: 6 },
		minute: { length: 0.7, width: 6 },
		second: { length: 0.85, width: 4 },
		smooth: true
	},
	display: {
		markers: 'lines',
		hourMarkerWidth: 5,
		minuteMarkerWidth: 0,
		showBorder: false,
		showInnerRing: false,
		showCenterRing: false
	},
	customColors: {
		backgroundGradient: {
			type: 'linear',
			start: '#ff77ff',
			end: '#77ddff',
			angle: 360
		},
		hands: {
			hour: '#fff',
			minute: '#fff',
			second: '#fff'
		},
		markers: {
			hour: '#ffffff',
			minute: '#ffeeff'
		},
		center: { dot: '#ffffff' }
	}
};

// ========== TIMEZONES (4) ==========
const timezoneNewYork: AnalogClockConfig = {
	theme: 'light',
	timezone: 'America/New_York',
	digitalDisplay: {
		enabled: true,
		format: '24h',
		showSeconds: true,
	},
};

const timezoneSydney: AnalogClockConfig = {
	theme: 'light',
	timezone: 'Australia/Sydney',
	hands: {
		smooth: true
	},
	digitalDisplay: {
		enabled: true,
		format: '24h',
		showSeconds: true,
	},
};

const timezoneParis: AnalogClockConfig = {
	theme: 'light',
	timezone: 'Europe/Paris',
	digitalDisplay: {
		enabled: true,
		format: '24h',
		showSeconds: true,
	},
};

const timezoneCairo: AnalogClockConfig = {
	theme: 'light',
	timezone: 'Africa/Cairo',
	digitalDisplay: {
		enabled: true,
		format: '24h',
		showSeconds: true,
	},
};

export const CLOCK_PRESETS = {
	// Themes
	lightTheme: lightTheme,
	darkTheme: darkTheme,
	customTheme: customTheme,
	
	// Classic
	minimalSwiss: minimalSwiss,
	vintageRailway: vintageRailway,
	classicSilver: classicSilver,
	minimalZen: minimalZen,
	elegantDiamond: elegantDiamond,
	classicGreen: classicGreen,
	classicEmerald: classicEmerald,
	classicBlackWhite: classicBlackWhite,
	classicPink: classicPink,
	classicBlue: classicBlue,
	classicOrange: classicOrange,
	classicBrown: classicBrown,
	
	// Modern
	modernAzureDepths: modernAzureDepths,
	modernEmeraldForest: modernEmeraldForest,
	modernJadeMist: modernJadeMist,
	modernDeepOcean: modernDeepOcean,
	modernAuroraBorealis: modernAuroraBorealis,
	modernIcebergBlue: modernIcebergBlue,
	modernNorthernLights: modernNorthernLights,
	modernSakuraDream: modernSakuraDream,
	modernMintChocolate: modernMintChocolate,
	modernDarkBrutalist: modernDarkBrutalist,
	modernMatrix: modernMatrix,
	modernVaporwave: modernVaporwave,
	
	// Timezones
	timezoneNewYork: timezoneNewYork,
	timezoneSydney: timezoneSydney,
	timezoneParis: timezoneParis,
	timezoneCairo: timezoneCairo
} as const;

export type PresetKey = keyof typeof CLOCK_PRESETS;