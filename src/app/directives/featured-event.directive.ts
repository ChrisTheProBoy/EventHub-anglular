import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appFeaturedEvent]',
    standalone: true
})
export class FeaturedEventDirective implements OnChanges {
    @Input('appFeaturedEvent') isFeatured: boolean = false;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnChanges(): void {
        if (this.isFeatured) {
            this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid #FFD700');
            this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 0 18px rgba(255, 215, 0, 0.5)');
            this.renderer.addClass(this.el.nativeElement, 'featured-event');
        } else {
            this.renderer.removeStyle(this.el.nativeElement, 'border');
            this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
            this.renderer.removeClass(this.el.nativeElement, 'featured-event');
        }
    }
}
