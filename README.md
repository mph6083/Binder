<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a >
    <img src="bitmap.png" alt="Logo" height="80">
  </a>

  <h1 align="center">Binder</h1>

  <p align="center">
    An open source EPUB3 editor and exporter for use in bookbinding
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a> -->
    <!-- ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a> -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<!-- <details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details> -->

[![Product Name Screen Shot][product-screenshot]](https://example.com)

<!-- ABOUT THE PROJECT -->
## About The Project



There are many ways to create a pdf for bookbinding; however, I didn't find one that really suited my needs so I created this enhanced one. I want to create a unified software system for easy editing and exportation of large EPUB books and remove many manual steps that are required using other methods.

Benifits to traditional EPUB conversion for binding:
* Automates Injestion and exportation 
* allows for custom css and reusable code for similar projects
* outputs to EPUB and PDF for versitile distribution

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With
* [Angular][Angular-url]
* [monaco-editor]()
* [jspdf]()
* [jszip]()
* [file-saver]()
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

_Nodejs is required to run the build tools and the binder pdfserver_

clone repositories Binder & Binder-PdfServer. The relative location of both projects is not important.

### **Installation**

_for production building and other development flags see Angular cli reference pages_

_Binder-PdfServer is required to run for noraml program operation, after cloning the Binder-PdfServer follow the same steps listed below in that directory. default port: 3000_

1. Update npm to latest version
```sh
npm i -g npm@latest
```
2. Install Node Modules
```sh
npm install
```
1. Run Development server (default port 4200)
```sh
npm run start
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

_Ebooks can be found on the project guetenberg website. They are all public domain and can be modified and distributed in any way you see fit._

Steps for creating a pdf:

1. Download ebook from project guetenberg. We highly recomend little women; it's a great read.
2. open web application most likely at http://localhost:4200.
3. click `new project`.
4. select `Choose File` and select the file for the downloaded ebook.
5. Edit files.
6. Press `export` in the top left of the editor screen.
7. Select `render to pdf` to download a pdf for binding or Select `download epub zip` to save your changes for editing later



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Editing Files



Files are edited via the Editor page. Only text files are avalible for editing and viewing. 

*Note:* Images will not be shown and the EPUB will need to be downloaded and converted to a zip file to see/edit images. All images will be coppied over to the downloadable epub and will be rendered when included in the finished PDF.
### __*.html | *.xhtml | *.htm__

Epubs use the XHTML5 syntax and accept all valid HTML. These files makeup the displayed content of the EPUB file.

### **OEBPS/content.opf**

while the name of the file is unlikely to vary, the file may have a different name or file path. To find the file that contains the manifest and metadata open the `META-INF/container.xml` file and find this line:

`<rootfile full-path="{YOUR FILE WILL BE LISTED HERE}" media-type="application/oebps-package+xml"/>`

### Metadata
The metadata will be found at the top of the content file. At this time the information will not be embedded into the pdf but will continue to provide information for the ebook and it is recomended when you change the files to add yourself as a contributor under the `<dc:creator>` tag with the syntax:

`
<dc:contributor opf:role="{YOUR ROLE HERE}" opf:file-as="{YOUR NAME}">{YOUR NAME}</dc:contributor>
`

### manifest
The `<manifest>` contains All the files that are included in the EPUB file and their ID, Media Type, and url/href. The files included are not gaurented to be in the correct order and for ordering you should look to the `<spine>`.

### spine
The `<spine>` contains an ordered list of `<itemref>`'s detailing the contents of the EPUB in the order it should be displayed. Especially for books, this is not the same as the list of chapters or sections. however the table of contents is specified in the spine by the attribute `<spine toc="">`.

The `<Itemref>`'s inside the spine reference the `<item>` tags in the manifest. They are in the format:

`<itemref idref="{ITEM ID}" linear="yes"/>`

`<item href="{PATH TO FILE}" id="{ITEM ID}" media-type="application/xhtml+xml"/>`
</br>
</br>
### **BinderCss.html**
The `BinderCss.html` file is not standard to the epub file format. It is automatically injected into the ingested epub file. It does not/will not be added to the manifest. It contains the template code for setting helpful page css special attributes for printing . It needs to be uncommented. This serves as a helper file which will not change the EPUB for regular consumption and serves only to specify the configuration for exporting to pdf for binding. For aditional information on available css see the `@page` CSS at-rule.

The file contains sample css for size and page numbers shown below:
```html
<style>
@page{
  /* Page Size & orientation */
  /* size: A4 landscape; */


  /* page numbers */
  /* @bottom-left {
      content: counter(page) ' of ' counter(pages);
  } */
}
</style>
```

#### **Note on coding examples**
For all code examples, user fields will be denoted by `{ALL CAPS TEXT}`.

As an example for the user feild value Matthew for the code block `<test input="{HELLO}">` would have a resulting code block of
`<test input="Matthew">` **NOT** `<test input="{Matthew}">`

<!-- CONTRIBUTING -->
## Contributing

This software system while functional is not the most user friendly. Any contributions  are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".


1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



**We request that all EPUB files you use in this program you have the rights to modify and that you follow all aplicable laws in the use of the software and with any files created by the software.**

<!-- CONTACT -->
## Contact

Matthew Hyland - mph6083@g.rit.edu

<!-- Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name) -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: binder-editior.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
