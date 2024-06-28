
enum SegmentPos {
    T,
    TL,
    TR,
    M,
    B,
    BL,
    BR
}

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
        {image: assets.image`T`, x: 1, y: 0},
        {image: assets.image`L`, x: 0, y: 2},
        {image: assets.image`R`, x: 11, y: 2},
        {image: assets.image`M`, x: 2, y: 14},
        {image: assets.image`B`, x: 1, y: 28},
        {image:assets.image`L`, x: 0, y: 17},
        {image:assets.image`R`, x: 11, y: 17},
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

        toggle(segment: SegmentPos, enabled: boolean=true) {
            this.segments[segment] = enabled;
            this.render();
        }

        drawCharacter(char: string) {
            let segments = this.characters[char] || EMPTY;
            this.segments = segments;
            this.render();
        }

        render() {
            let x = this.x;
            let y = this.y;
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
            this.setImage(rendered);
            this.setPosition(x, y);
        }
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
        "F": [true, true, false, true, false, true, false]
    }
}