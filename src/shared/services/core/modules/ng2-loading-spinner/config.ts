export interface INg2LoadingSpinnerConfig {
    animationType?: string,
    backdropColor?: string,
    backdropBorderRadius?: string,
    spinnerColor?: string,
    spinnerPosition?: string,
    spinnerSize?: string,
    spinnerFontSize?: string
}

export class Ng2LoadingSpinnerConfig implements INg2LoadingSpinnerConfig {
    animationType;
    backdropColor: string;
    spinnerColor: string;
    spinnerPosition: string;
    backdropBorderRadius: string;
    spinnerSize: string;
    spinnerFontSize: string;

    constructor(private config: INg2LoadingSpinnerConfig) {
        this.animationType = config.animationType;
        this.backdropColor = config.backdropColor;
        this.spinnerColor = config.spinnerColor;
        this.spinnerPosition = config.spinnerPosition;
        this.backdropBorderRadius = config.backdropBorderRadius;
        this.spinnerSize = config.spinnerSize;
        this.spinnerFontSize = config.spinnerFontSize;
    }
}

export enum Ng2LoadingSpinnerColors {
    imatDarkBlue = '#002b49',
    imatLightBlue = '#2881ba',
    imatRed = '#e64f3b',
    imatWhite = '#ffffff',
    imatLightGrey = '#edefef',
    imatDarkGrey = '#e0e2e3',
    imatYellow = '#efc920',
    imatGreen = '#33ab4a',
    imatGlacierBlue = '#80a2b9',
    imatTransparent = 'transparent',
}

export const DefaultContainerSpinnerConfig : INg2LoadingSpinnerConfig = {
    animationType: 'bouncingDots',
    spinnerPosition: 'center',
    backdropColor: Ng2LoadingSpinnerColors.imatTransparent,
    spinnerColor: Ng2LoadingSpinnerColors.imatRed,
    spinnerSize: 'md',
}

export const DefaultButtonSpinnerConfig : INg2LoadingSpinnerConfig = {
    animationType: 'dualCircle',
    spinnerPosition: 'center',
    backdropColor: Ng2LoadingSpinnerColors.imatTransparent,
    spinnerColor: Ng2LoadingSpinnerColors.imatWhite,
    spinnerSize: 'sm',
}