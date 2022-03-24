import { Component, h, State } from "@stencil/core";

@Component({
  tag: 'app-tooltip',
  styleUrl: './tooltip.css',
  shadow: true
})
export class TooltipComponent {

  @State() showinfo = false;
  mouseEnter() {
    this.showinfo = true;
  }
  
  mouseLeave() {
    this.showinfo = false;
  }

  render() {
    return (
      <div class='tooltip'>
        <div class="tooltip-legend">
          <p>Let's test this new Tooltip</p>
          <span onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>(?)</span>
        </div>
        <div class={(this.showinfo ? 'show' : 'hidde') + ' tooltip-info'} >
          <p>This could be helpful info for you</p>
        </div>
      </div>
    )
  }

}