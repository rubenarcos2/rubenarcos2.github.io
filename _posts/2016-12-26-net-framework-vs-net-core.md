---
layout: post
title: .Net Framework vs .Net Core
date: 2016-12-26 19:10
author: ruben
comments: true
categories: [.net, articulos, Blog, blog, C#, microsoft, opinion]
---
<p style="text-align: justify;">Microsoft ha lanzado recientemente un nuevo producto perteneciente al ecosistema de .Net, denominado .Net Core, el cual va dirigido a la programaciÃ³n multiplataforma desde un entorno de desarrollo Ãºnico. <!--more-->Este estÃ¡ actualmente constituido por un entorno de desarrollo, un framework y, las herramientas y compiladores del SDK. Actualmente, los lenguajes de desarrollo soportados son C# y F#, como era de esperar, aunque en breve tambiÃ©n aceptarÃ¡ VB para la escritura de aplicaciones. El desarrollo y compilaciÃ³n de aplicaciones se podrÃ¡ realizar desde cualquier IDE o editor de textos y compatible a cualquier SO (Linux, Mac y Windows).</p>
&nbsp;
<blockquote>
<p style="text-align: center;"><em>"Weâ€™ve decided to drastically simplify the porting effort by unifying the core APIs with other .NET platforms, specifically the .NET Framework and Mono/Xamarinm"</em>, comenta el Program Manager Immo Landwerth.</p>
</blockquote>
&nbsp;
<p style="text-align: justify;">Realmente, .NET Core proporciona un conjunto de API que estÃ¡n disponibles actualmente tanto en .NET Framework como en Mono/Xamarin, pero asegurÃ¡ndose de la compatibilidad real en todos los entornos/SO de ejecuciÃ³n (mapa de ruta de .NET Core). Cabe destacar que no existe actualmente una compatibilidad total con las bibliotecas que disponÃ­amos hasta ahora.</p>
&nbsp;
<p style="text-align: justify;">
<img class="aligncenter wp-image-890" src="http://localhost/wp-content/uploads/2016/12/net-core-4-6381.jpg" alt="net-core-4-638[1]" width="600" height="338" /></p>
&nbsp;
<p style="text-align: justify;">Para portar una aplicaciÃ³n realizada en .NET Framework o en Mono/XamarÃ­n, debemos realizar cambios y/o modificaciones tanto en las librerÃ­as, llamadas como en algunos casos de la funcionalidad; para que puede ejecutarse sin incompatibilidades o dependencias incompletas. Todas las herramientas disponibles estÃ¡ centradas en el desarrollo de aplicaciones de consola y en Windows Presentation Foundation (WPF usa XAML para crear interfaces de usuario (UI)), la apariencia utilizada en las nuevas aplicaciones de escritorio de Windows 10, Microsoft .NET Framework 3.5, tanto para ejecuciones en escritorio como en la web.</p>
&nbsp;
<p style="text-align: justify;">.NET Core implementa la biblioteca estÃ¡ndar .NET y, por tanto, admite las bibliotecas estÃ¡ndar .NET, pero no permite la ejecuciÃ³n de Web Forms, Windows Formsâ€¦ y en el caso de Mono/Xamarin tampoco es compatible con toda su biblioteca, ni con Windows Forms o Xamarin.iOS, es cÃ³digo abierto y se distribuye libremente desde github, pero se centra principalmente en el desarrollo cloud con grandes cargas de trabajo.</p>
&nbsp;
<p style="text-align: justify;">EstÃ¡ pensado principalmente principalmente para aplicaciones multiplataforma, que funcionen en varios sistemas y en microservicios, es compatible con las principales arquitecturas (admite actualmente CPU X64. En Windows, tambiÃ©n se admite X86. ARM64 y ARM32 estÃ¡n en curso) y con los SO actuales (en Windows, macOS y Linux. En Linux, Microsoft admite principalmente la ejecuciÃ³n de .NET Core en las familias de distribuciÃ³n Red Hat Enterprise Linux (RHEL) y Debian).</p>
&nbsp;
<p style="text-align: justify;"><img class="aligncenter wp-image-883" src="http://localhost/wp-content/uploads/2016/12/Microsoft-.net-for-windows-linux-and-macos-n1.jpg" alt="Microsoft-.net-for-windows-linux-and-macos-n[1]" width="600" height="324" /></p>
&nbsp;
<p style="text-align: justify;">Personalmente, me parece una oportunidad Ãºnica para realizar desarrollos multiplataformas con todo el apoyo comercial y soporte de Microsoft (con la seguridad de que realizarÃ¡ una masiva distribuciÃ³n y aporte tÃ©cnico a la plataforma), lo que augura una gran aceptaciÃ³n por parte de la comunidad empresarial y open source, como de la divulgaciÃ³n de una gran cantidad de material de .NET Core.</p>
&nbsp;
<p style="text-align: justify;">En breve, deseo reflejar mi experiencia personal portando mi â€˜proyecto fin del C.F.G.S. desde .NET Framework 4.0 en el cual se realizÃ³ a .NET Core. Siendo consciente de que no podrÃ© utilizar Windows Forms en los que estÃ¡ basado y algunas dependencias de las bibliotecas nativas, estoy seguro de que serÃ© un reto interesante, el cual espero sea factible y satisfactorio.</p>
&nbsp;
<h5 style="text-align: justify;">Fuentes:
<a href="https://docs.microsoft.com/es-es/dotnet/articles/core/">https://docs.microsoft.com/es-es/dotnet/articles/core/</a>
<a href="https://msdn.microsoft.com/es-es/library/cc295302.aspx">https://msdn.microsoft.com/es-es/library/cc295302.aspx</a>
<a href="https://docs.microsoft.com/es-es/dotnet/articles/core/porting/">https://docs.microsoft.com/es-es/dotnet/articles/core/porting/</a>
<a href="http://www.campusmvp.es/recursos/post/Cuando-deberias-usar-NET-Core-y-cuando-no.aspx">http://www.campusmvp.es/recursos/post/Cuando-deberias-usar-NET-Core-y-cuando-no.aspx</a></h5>
<h5 style="text-align: justify;">Lecturas recomendadas:
<a href="http://www.campusmvp.es/recursos/post/Migrando-aplicaciones-de-NET-al-nuevo-NET-Core-Preguntas-y-respuestas.aspx">http://www.campusmvp.es/recursos/post/Migrando-aplicaciones-de-NET-al-nuevo-NET-Core-Preguntas-y-respuestas.aspx</a>
<a href="http://www.michael-whelan.net/porting-dotnet-framework-library-to-dotnet-core/">http://www.michael-whelan.net/porting-dotnet-framework-library-to-dotnet-core/</a>
<a href="https://visualstudiogallery.msdn.microsoft.com/1177943e-cfb7-4822-a8a6-e56c7905292b">https://visualstudiogallery.msdn.microsoft.com/1177943e-cfb7-4822-a8a6-e56c7905292b</a></h5>
<h5 style="text-align: justify;">Docker para .NET core, hello world sin complicaciones:
<a href="https://hub.docker.com/r/microsoft/dotnet/">https://hub.docker.com/r/microsoft/dotnet/</a></h5>
