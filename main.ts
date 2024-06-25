
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

        constructor() {
            super(image.create(0, 0));
            this.segments = arrays.repeat(false, 7);
            this.color = 2;
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
}