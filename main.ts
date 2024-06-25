
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
        {image: assets.image`TL`, x: 0, y: 2},
        {image: assets.image`TR`, x: 11, y: 2},
        {image: assets.image`M`, x: 2, y: 14},
        {image: assets.image`B`, x: 1, y: 28},
        {image: assets.image`BL`, x: 0, y: 17},
        {image: assets.image`BR`, x: 11, y: 17},
    ]

    class SevenSegment extends sprites.ExtendableSprite {
        segments: boolean[];
        rendered: Image;

        constructor() {
            super(image.create(0, 0));
            this.segments = arrays.repeat(false, 7);
        }

        toggle(segment: SegmentPos, enabled: boolean) {

        }
    }
}