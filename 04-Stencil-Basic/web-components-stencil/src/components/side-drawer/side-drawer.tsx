import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: 'app-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @Prop({ reflect: true }) title: string;
  @Prop() open: boolean;

  render() {
    let content = null;
    if(this.open) {
      content = (
        <aside>
          <header><h1>{this.title}</h1></header>
          <main>
            <slot/>
          </main>
        </aside>
      )
    }
    return content;
  }
}
