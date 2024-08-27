
enum SegmentPos {
    //% block="Top"
    T,
    //% block="Top Left"
    TL,
    //% block="Top Right"
    TR,
    //% block="Center"
    M,
    //% block="Bottom"
    B,
    //% block="Bottom Left"
    BL,
    //% block="Bottom Right"
    BR
}

//% block="Seven Segment"
//% icon="\uf00a"
//% color=#f5ad42
namespace sevenSegment {

    interface Segment {
        image: Image;
        x: number;
        y: number;
    }

    interface Characters {
        [key: string]: boolean[];
    }

    const EMPTY = arrays.repeat(false, 7);

    const segments: Segment[] = [
        { image: assets.image`T`, x: 1, y: 0 },
        { image: assets.image`L`, x: 0, y: 2 },
        { image: assets.image`R`, x: 11, y: 2 },
        { image: assets.image`M`, x: 2, y: 14 },
        { image: assets.image`B`, x: 1, y: 28 },
        { image: assets.image`L`, x: 0, y: 17 },
        { image: assets.image`R`, x: 11, y: 17 },
    ]

    class SevenSegment extends sprites.ExtendableSprite {
        private segments: boolean[];
        private _color: number;
        private characters: Characters;

        constructor(segments?: boolean[], color?: number) {
            super(image.create(0, 0));
            this.segments = segments || EMPTY;
            this.color = color !== undefined ? color : 2;
            this.characters = characters;
        }

        get color(): number {
            return this._color;
        }

        set color(value: number) {
            this._color = value;
            this.render();
        }

        toggle(segment: SegmentPos, enabled: boolean = true) {
            this.segments[segment] = enabled;
            this.render();
        }

        drawCharacter(char: string) {
            let segments = this.characters[char] || this.characters[char.toUpperCase()];
            segments = segments || EMPTY;
            this.segments = segments;
            this.render();
        }

        prerender() {
            let rendered = image.create(15, 32);
            let segment: Segment;
            let segmentImg: Image;
            for (let i = 0; i < 7; i++) {
                segment = segments[i];
                if (this.segments[i]) {
                    segmentImg = segment.image;
                    segmentImg.replace(2, this.color);
                    rendered.drawTransparentImage(segmentImg, segment.x, segment.y);
                }
            }
            return rendered;
        }

        render() {
            let x = this.x;
            let y = this.y;
            let rendered = this.prerender();

            this.setImage(rendered);
            this.setPosition(x, y);
        }
    }

    /**
     * Create seven segment digit
     * @param segments Digit segments (optional, default is none)
     * @param color Color of the segments (optional, default is red)
     * @returns SevenSegment sprite
     */
    //% blockId=sevenSegment_create
    //% block="create digit || of $segments | with color $color"
    //% blockSetVariable=myDigit
    //% color.shadow=colorNumberPicker
    export function create(segments?: boolean[], color?: number): SevenSegment {
        let digit = new SevenSegment(segments, color);
        if (segments) digit.render();
        return digit;
    }

    /**
     * Create seven segment digit from character
     * @param character Character to use (must be of length 1)
     * @param color Color of the segments (optional, default is red)
     * @returns SevenSegment sprite
     */
    //% blockId=sevenSegment_createFromChar
    //% block="create digit from $character || with color $color"
    //% blockSetVariable=myDigit
    //% character.defl="8"
    //% color.shadow=colorNumberPicker
    export function createFromChar(character: string, color?: number): SevenSegment {
        let digit = new SevenSegment(null, color);
        digit.drawCharacter(character);
        return digit;
    }

    /**
     * Toggle specific digit segment
     * @param digit Digit to modify
     * @param segment Segment to toggle
     * @param enabled Segment state (default is enabled)
     */
    //% blockId=sevenSegment_toggle
    //% block="set $digit segment $segment enabled $enabled"
    //% digit.shadow=variables_get
    //% digit.defl=myDigit
    export function toggle(digit: SevenSegment, segment: SegmentPos, enabled: boolean=true): void {
        digit.toggle(segment, enabled);
    }

    /**
     * Set digit segment color
     * @param digit Digit to modify
     * @param color Segment color
     */
    //% blockId=sevenSegment_setColor
    //% block="set $digit color $color"
    //% digit.shadow=variables_get
    //% digit.defl=myDigit
    //% color.shadow="colorNumberPicker"
    export function setColor(digit: SevenSegment, color: number): void {
        digit.color = color;
    }

    export function setCharacter(digit: SevenSegment, character: string): void {
        digit.drawCharacter(character);
    }

    let characters: Characters = {
        "0": [true, true, true, false, true, true, true],
        "1": [false, false, true, false, false, false, true],
        "2": [true, false, true, true, true, true, false],
        "3": [true, false, true, true, true, false, true],
        "4": [false, true, true, true, false, false, true],
        "5": [true, true, false, true, true, false, true],
        "6": [true, true, false, true, true, true, true],
        "7": [true, false, true, false, false, false, true],
        "8": [true, true, true, true, true, true, true],
        "9": [true, true, true, true, true, false, true],
        "A": [true, true, true, true, false, true, true],
        "B": [false, true, false, true, true, true, true],
        "C": [true, true, false, false, true, true, false],
        "D": [false, false, true, true, true, true, true],
        "E": [true, true, false, true, true, true, false],
        "F": [true, true, false, true, false, true, false],
        "H": [false, true, true, true, false, true, true],
        "I": [false, false, true, false, false, false, true],
        "J": [false, false, true, false, true, true, true],
        "L": [false, true, false, false, true, true, false],
        "N": [false, false, false, true, false, true, true],
        "O": [false, false, false, true, true, true, true],
        "P": [true, true, true, true, false, true, false],
        "R": [false, false, false, true, false, true, false],
        "S": [true, true, false, true, true, false, true],
        "U": [false, true, true, false, true, true, true],
        "-": [false, false, false, true, false, false, false],
        "_": [false, false, false, false, true, false, false],
        "°": [true, true, true, true, false, false, false]
    }
}