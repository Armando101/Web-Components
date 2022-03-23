import { Component, h, Method, Prop, State } from "@stencil/core";

@Component({
  tag: 'app-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @State() showContactInfo = false;
  @Prop({ reflect: true }) title: string;
  @Prop({ reflect: true, mutable: true }) opened: boolean;

  onCloseDrawer(){
    this.opened = false;
  }

  onContentChange(content: string) {
   this.showContactInfo = (content === 'contact');
  }

  @Method()
  open() {
      this.opened = true;
  }

  render() {
    let mainContent = <slot/>
    if (this.showContactInfo) {
      mainContent= (
        <div class="contactInformation">
          <h2>Contact information</h2>
          <p>You can reach us via phone or email</p>
          <ul>
            <li>
              Phone: 12312313
            </li>
            <li>E mail <a href="mailto:rivera.armando997@gmail.com">rivera.armando997@gmail.com</a></li>
          </ul>
        </div>  
      )
    }

    return <aside>
            <header>
              <h1>{this.title}</h1>
              <button onClick={this.onCloseDrawer.bind(this)}>x</button>
            </header>
            <section class="tabs" id="tabs">
              <button class={!this.showContactInfo && "active"} onClick={this.onContentChange.bind(this, 'nav')}>Navigation</button>
              <button class={this.showContactInfo && "active"} onClick={this.onContentChange.bind(this, 'contact')}>Content</button>
            </section>
            <main>
              {mainContent}
            </main>
          </aside>
  }
}
