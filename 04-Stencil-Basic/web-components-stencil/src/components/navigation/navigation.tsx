import { Component, h } from "@stencil/core";

@Component({
 tag: 'app-navigation',
 styleUrl: './navigation.css',
 shadow: true
})
export class Navigation {

  render() {
    return <nav class="sidebar">
      <ul>
        <li><a href="/">A link</a></li>
        <li><a href="/">Another link</a></li>
        <li><a href="/">One link</a></li>
      </ul>
    </nav>
  }

}