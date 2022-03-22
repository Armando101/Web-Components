import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: 'app-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @Prop({ reflect: true }) title: string;
  @Prop({ reflect: true, mutable: true }) open: boolean;

  onCloseDrawer(){
    this.open = false;
  }

  render() {
    // let content = null;
    // if(this.open) {
    //   content = (
    //     <aside>
    //       <header><h1>{this.title}</h1></header>
    //       <main>
    //         <slot/>
    //       </main>
    //     </aside>
    //   )
    // }
    // return content;
    return <aside>
            <header>
              <h1>{this.title}</h1>
              <button onClick={this.onCloseDrawer.bind(this)}>x</button>
            </header>
            <main>
              <slot/>
            </main>
          </aside>
  }
}
