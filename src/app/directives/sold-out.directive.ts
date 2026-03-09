import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appSoldOut]',
    standalone: true
})
export class SoldOutDirective implements OnChanges {
    @Input('appSoldOut') isSoldOut: boolean = false;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnChanges(): void {
        if (this.isSoldOut) {
            this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.75');
            this.renderer.setStyle(this.el.nativeElement, 'filter', 'grayscale(30%)');
            this.renderer.addClass(this.el.nativeElement, 'sold-out-event');
        } else {
            this.renderer.removeStyle(this.el.nativeElement, 'opacity');
            this.renderer.removeStyle(this.el.nativeElement, 'filter');
            this.renderer.removeClass(this.el.nativeElement, 'sold-out-event');
        }
    }
}
