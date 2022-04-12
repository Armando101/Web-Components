import { Component, h } from "@stencil/core";

@Component({
  tag: 'app-spinner',
  shadow: true,
  styleUrl: './spinner.css'
})
export class Spinner {

  render() {
    return (
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

}