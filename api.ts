
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

const characters: Characters = {
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

interface Segment {
    image: Image;
    x: number;
    y: number;
}

interface Characters {
    [key: string]: boolean[];
}

const EMPTY: boolean[] = arrays.repeat(false, 7);

const segments: Segment[] = [
    { image: assets.image`T`, x: 1, y: 0 },
    { image: assets.image`L`, x: 0, y: 2 },
    { image: assets.image`R`, x: 11, y: 2 },
    { image: assets.image`M`, x: 2, y: 14 },
    { image: assets.image`B`, x: 1, y: 28 },
    { image: assets.image`L`, x: 0, y: 17 },
    { image: assets.image`R`, x: 11, y: 17 },
]

//% blockNamespace="sevenSegment"
class SevenSegment extends sprites.ExtendableSprite {
    private segments: boolean[];
    private color: number;
    private characters: Characters;

    constructor(segments?: boolean[], color?: number) {
        super(image.create(0, 0));
        this.segments = segments || EMPTY;
        this.color = color !== undefined ? color : 2;
        this.characters = characters;
    }

    /**
     * Get digit segment color
     * @param digit Digit to read
     * @returns Color of digit segments
     */
    //% blockId=sevenSegment_getColor
    //% block="get current $this(myDigit) color"
    //% group="Read"
    public getColor(): number {
        return this.color;
    }

    /**
     * Set digit segment color
     * @param digit Digit to modify
     * @param color Segment color
     */
    //% blockId=sevenSegment_setColor
    //% block="set $this(myDigit) color to $color"
    //% color.shadow="colorindexpicker"
    //% group="Modify"
    public setColor(color: number) {
        this.color = color;
        this.render();
    }

    /**
     * Toggle specific digit segment
     * @param digit Digit to modify
     * @param segment Segment to toggle
     * @param enabled Segment state (default is enabled)
     */
    //% blockId=sevenSegment_toggle
    //% block="set $this(myDigit) segment $segment enabled $enabled"
    //% group="Modify"
    public toggle(segment: SegmentPos, enabled: boolean = true) {
        this.segments[segment] = enabled;
        this.render();
    }

    /**
     * Set digit character
     * @param digit Digit to modify
     * @param character Character to set (must be of length 1)
     */
    //% blockId=sevenSegment_setCharacter
    //% block="set $this(myDigit) character to $char"
    //% character.defl="8"
    //% group="Modify"
    drawCharacter(char: string) {
        let segments = this.characters[char] || this.characters[char.toUpperCase()];
        segments = segments || EMPTY;
        this.segments = segments;
        this.render();
    }

    /**
     * Check if digit segment is enabled
     * @param digit Digit to read
     * @returns True if digit segment is enabled
     */
    //% blockId=sevenSegment_isEnabled
    //% block="is $this(myDigit) segment $segment enabled"
    //% group="Read"
    public isEnabled(segment: SegmentPos) {
        return this.segments[segment];
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

//% block="Seven Segment"
//% icon="\uf00a"
//% color=#f5ad42
//% groups=["Create", "Modify", "Read"]
namespace sevenSegment {

    /**
     * Create seven segment digit
     * @param segments Digit segments (optional, default is none)
     * @param color Color of the segments (optional, default is red)
     * @returns SevenSegment sprite
     */
    //% blockId=sevenSegment_create
    //% block="create digit || of $segments | with color $color"
    //% blockSetVariable=myDigit
    //% color.shadow=colorindexpicker
    //% group="Create"
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
    //% color.shadow=colorindexpicker
    //% group="Create"
    export function createFromChar(character: string, color?: number): SevenSegment {
        let digit = new SevenSegment(null, color);
        digit.drawCharacter(character);
        return digit;
    }
}