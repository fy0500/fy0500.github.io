---
hide:
  - toc
  - navigation
---

<section class="hero">
<div class="hero__ticks"></div>
<span class="hero__corner hero__corner--tl">33°55′ S</span>
<span class="hero__corner hero__corner--tr">18°25′ E</span>
<span class="hero__corner hero__corner--bl">SHEET 01 · PORTFOLIO</span>
<span class="hero__scale"><span>0</span><i></i><span>500 km</span></span>
<div class="hero__inner">
<div class="hero__text">
<p class="hero__eyebrow">Geospatial portfolio</p>
<h1>Fiononana <em>Rasamimanana</em></h1>
<ul class="hero__roles"><li>Machine Learning Engineer</li><li>Geomatics Expert</li><li>Remote Sensing &amp; Spatial Analysis</li></ul>
<p class="lede">Turning spatial data into insights.</p>
<p class="stack">GIS&nbsp;·&nbsp;Remote Sensing&nbsp;·&nbsp;Deep Learning&nbsp;·&nbsp;Python</p>
<div class="hero__cta">
<a class="btn btn--primary" href="projects/">View my projects <span aria-hidden="true">→</span></a>
<a class="btn" href="assets/CV_Fiononana.pdf">Download CV <span aria-hidden="true">↓</span></a>
</div>
</div>
<figure class="hero__photo">
<span class="hero__note">hi, that's me <svg viewBox="0 0 30 26" aria-hidden="true"><path d="M3 4c10-3 19 3 23 16M19 17l7 4 1-9"/></svg></span>
<div class="frame">
<span class="hero__pin"></span>
<img src="assets/images/profile.webp" width="800" height="902" alt="Fiononana Rasamimanana sitting on a rock above a coastal landscape">
<figcaption><span>Based in Cape Town</span><span>33.92° S · 18.42° E</span></figcaption>
</div>
</figure>
</div>
</section>

<div class="facts reveal">
<div class="fact"><span class="fact__num"><span data-count="83">83</span><small>%</small></span><span class="fact__label">overall accuracy for the U-Net garden detector, against 58 % for Random Forest</span></div>
<div class="fact"><span class="fact__num"><span data-count="291460">291,460</span></span><span class="fact__label">road segments inventoried across 94 of 101 French departments</span></div>
<div class="fact"><span class="fact__num"><span data-count="93" data-decimals="1">93.0</span><small>%</small></span><span class="fact__label">overall accuracy of the 2023 Sentinel-2 land cover map (17 classes)</span></div>
<div class="fact"><span class="fact__num"><span data-count="3">3</span></span><span class="fact__label">countries studied and worked in: Madagascar, France, South Africa</span></div>
</div>

<div class="sec-head reveal"><span class="sec-no">01</span><h2>About me</h2></div>

<div class="about-section reveal" markdown>
<div class="about-text" markdown>

I am a geomatics and remote sensing specialist with advanced Master-level training, based in Cape Town, South Africa. I use geospatial data and deep learning to address environmental and territorial challenges, from vegetation mapping to environmental health assessment.

My background spans the University of Antananarivo (Master 2 in Earth Physics, thesis defended in August 2026), the University of La Réunion (international credit mobility in Geomatics and Remote Sensing), and research internships at INERIS in France and the Institute and Observatory of Geophysics of Antananarivo (IOGA) in Madagascar. I am currently pursuing an MSc in Applied Mathematics at Stellenbosch University to strengthen my quantitative and analytical skills.

My recent work has focused on two main areas:

- **Remote sensing and deep learning:** automatic detection of individual vegetable, allotment and ornamental gardens from 20 cm aerial imagery (IGN BD ORTHO). A U-Net with a ResNet-34 encoder reached 83 % overall accuracy versus 58 % for Random Forest, and an IoU of 82 % on allotment gardens in the Oise test area.
- **GIS and environmental data:** structuring a PostgreSQL / PostGIS road network database and automating the collection and harmonization of open road traffic data (94 of 101 departments inventoried, 291,460 road segments) for environmental health risk assessment.

Earlier, at IOGA, I produced Sentinel-2 land cover maps of Ankarafantsika National Park (2018 and 2023, with overall accuracies of 91.4 % and 93.0 %) and built an ecosystem accounting approach in SAGA GIS.

I am particularly interested in scientific and applied projects combining satellite Earth observation, spatial modeling and vegetation dynamics, especially forest disturbance and recovery monitoring, with a focus on international opportunities in Europe and South Africa.

</div>
<figure class="about-fig">
<img src="assets/images/about.webp" width="1100" height="825" loading="lazy" alt="Fiononana presenting a slide on random forests in a lecture hall">
<figcaption><b>FIG. 1</b> · Explaining random forests to a lecture hall.</figcaption>
</figure>
</div>

<div class="sec-head reveal"><span class="sec-no">02</span><h2>Where the work happened</h2></div>

<p class="reveal" style="max-width:42rem">Five places, one trail: from the tropical forests of Madagascar to the orthophotos of Île-de-France, and now Cape Town. Pick a pin to see what I did there.</p>

<div class="fieldwork reveal">
<div class="fieldwork__note">pins are clickable <svg viewBox="0 0 40 26" aria-hidden="true"><path d="M2 4c12-4 24 0 32 16M26 17l8 4 2-9"/></svg></div>
<div class="mapframe">
<div id="field-map" role="region" aria-label="Map of the places where I studied and worked"></div>
<span class="mapframe__hint">click the map, then scroll to zoom</span>
<button class="mapframe__reset" type="button">Reset view</button>
</div>
<ol class="sites" id="site-list"></ol>
</div>

<div class="sec-head reveal"><span class="sec-no">03</span><h2>Toolkit</h2></div>

<div class="grid cards reveal" markdown>

-   :material-layers:{ .lg .middle } **GIS & Remote Sensing**

    ---

    - QGIS, SNAP, SAGA GIS, OTB toolbox, Google Earth Engine
    - Sentinel-1 and Sentinel-2 processing
    - Very-high-resolution aerial imagery (IGN BD ORTHO, 20 cm)
    - Terrain data: IGN LiDAR height model, SRTM
    - Supervised and unsupervised classification, thematic mapping

-   :material-code-braces:{ .lg .middle } **Programming**

    ---

    - Python — rasterio, NumPy, scikit-learn, Albumentations, Folium
    - SQL, Git
    - JavaScript (Google Earth Engine)
    - MATLAB, SageMath, R (beginner)

-   :material-star-four-points:{ .lg .middle } **Machine Learning & GeoAI**

    ---

    - Random Forest classification
    - Deep learning for image segmentation — U-Net (ResNet-34 encoder)
    - Training pipelines: tiling, normalization, data augmentation
    - Model training on Google Colab GPU

-   :material-database:{ .lg .middle } **Spatial Data & Web Mapping**

    ---

    - PostgreSQL + PostGIS
    - Automated collection and harmonization of open data
    - Web mapping with Python and Folium
    - Formats: GeoTIFF, GeoJSON

-   :material-leaf:{ .lg .middle } **Ecology & Fieldwork**

    ---

    - Land cover and ecosystem accounting (SAGA GIS)
    - Tropical ecosystems and plant ecology
    - Field campaigns and GPS reference data with KoboCollect

-   :material-sigma:{ .lg .middle } **Mathematics & Geophysics**

    ---

    - MSc Applied Mathematics (Stellenbosch University, in progress)
    - Statistical learning and numerical modelling
    - Geophysical prospecting (electrical, magnetic, seismic)

</div>

<section class="cta reveal">
<h2>Let's map something together.</h2>
<p>I am open to PhD positions, work opportunities and collaborations, especially around satellite Earth observation, spatial modeling and forest dynamics.</p>
<div class="cta__row">
<a class="btn btn--primary" href="contact/">Get in touch <span aria-hidden="true">→</span></a>
<a class="btn" href="https://github.com/fy0500">GitHub</a>
<a class="btn" href="https://linkedin.com/in/fiononana-rasamimanana">LinkedIn</a>
</div>
</section>
