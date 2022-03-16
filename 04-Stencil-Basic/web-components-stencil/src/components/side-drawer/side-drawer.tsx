import { Component, h } from "@stencil/core";

@Component({
  tag: 'app-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  render() {
    return <aside><h1>The side drawer</h1></aside>
  }
}