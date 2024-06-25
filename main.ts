
enum SegmentPos {
    T,
    TL,
    TR,
    M,
    BL,
    BR,
    B
}

namespace sevenSegment {

    interface Segment {
        image: Image;
        x: number;
        y: number;
    }

    const segments: Segment[] = [
        {image: assets.image`T`, x: 0, y: 0}
    ]

    class SevenSegment extends sprites.ExtendableSprite {
        segments: boolean[];
        rendered: Image;

        constructor() {
            super(image.create(0, 0));
        }

        toggle(segment: SegmentPos, enabled: boolean) {

        }
    }
}