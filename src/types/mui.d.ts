import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    weather: {
      sunny: string;
      partlyCloudy: string;
      cloudy: string;
      fog: string;
      drizzle: string;
      freezingDrizzle: string;
      rain: string;
      heavyRain: string;
      freezingRain: string;
      snow: string;
      snowGrains: string;
      snowShowers: string;
      thunderstorm: string;
      thunderstormHail: string;
    };

    metrics: {
      temperature: string;
      wind: string;
      humidity: string;
      location: string;
    };

    system: {
      warning: string;
      neutral: string;
      pageBackground: string;
      countryText: string;
      detailText: string;
      selectedBackground: string;
    };
  }

  interface PaletteOptions {
    weather?: {
      sunny?: string;
      partlyCloudy?: string;
      cloudy?: string;
      fog?: string;
      drizzle?: string;
      freezingDrizzle?: string;
      rain?: string;
      heavyRain?: string;
      freezingRain?: string;
      snow?: string;
      snowGrains?: string;
      snowShowers?: string;
      thunderstorm?: string;
      thunderstormHail?: string;
    };

    metrics?: {
      temperature?: string;
      wind?: string;
      humidity?: string;
      location?: string;
    };

    system?: {
      warning?: string;
      neutral?: string;
      pageBackground?: string;
      countryText?: string;
      detailText?: string;
      selectedBackground?: string;
    };
  }
}
