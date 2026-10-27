(function(){
  const assets=window.PlantaeAssets||{};
  document.querySelectorAll('[data-asset]').forEach(img=>{const keys=img.dataset.asset.split('.');let value=assets;keys.forEach(key=>value=value&&value[key]);if(value)img.src=value;});
  const filters=[...document.querySelectorAll('[data-filter]')];
  const works=[...document.querySelectorAll('[data-work]')];
  filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>item.classList.remove('active'));button.classList.add('active');const filter=button.dataset.filter;works.forEach(work=>work.hidden=filter!=='all'&&!work.dataset.work.split(' ').includes(filter));}));
  const consultationForms = document.querySelectorAll('[data-consultation-form]');
  consultationForms.forEach(form => {
    if (form.id === 'consultationModalForm') return;

    form.addEventListener('submit', async event => {
      event.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : 'Submit';
      const noteEl = form.parentElement ? form.parentElement.querySelector('[data-form-note]') : document.querySelector('[data-form-note]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Enquiry...';
      }
      if (noteEl) {
        noteEl.textContent = 'Submitting your project details...';
        noteEl.style.color = '#384c3c';
      }

      try {
        const formData = new FormData(form);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();

        if (result.success) {
          form.reset();
          if (submitBtn) {
            submitBtn.textContent = 'Enquiry Sent ✓';
            submitBtn.disabled = false;
            setTimeout(() => { submitBtn.textContent = originalText; }, 5000);
          }
          if (noteEl) {
            noteEl.innerHTML = '<strong>Thank you!</strong> Your project enquiry has been delivered. Our landscape design team will be in touch within 24 hours.';
            noteEl.style.color = '#1f6e37';
          }
        } else {
          throw new Error(result.message || 'Submission error');
        }
      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
        if (noteEl) {
          noteEl.innerHTML = 'We couldn\'t send automatically. Please reach us directly on WhatsApp at <a href="https://wa.me/917400077765" target="_blank" rel="noopener noreferrer" style="text-decoration:underline; font-weight:600; color:inherit;">+91 74000 77765</a> or <a href="mailto:shruti@plantaeworld.com" style="text-decoration:underline; color:inherit;">shruti@plantaeworld.com</a>.';
          noteEl.style.color = '#a02b18';
        }
      }
    });
  });
const serviceCards=[...document.querySelectorAll(".service-card")];
  if(serviceCards.length){
    const lightbox=document.createElement("div");
    lightbox.className="service-lightbox";
    lightbox.setAttribute("role","dialog");
    lightbox.setAttribute("aria-modal","true");
    lightbox.setAttribute("aria-label","Service image preview");
    lightbox.innerHTML="<figure><button type=\"button\" aria-label=\"Close image preview\">Close</button><img alt=\"\"><figcaption></figcaption></figure>";
    document.body.append(lightbox);
    const preview=lightbox.querySelector("img"), caption=lightbox.querySelector("figcaption"), close=lightbox.querySelector("button");
    const dismiss=()=>{lightbox.classList.remove("is-open");document.body.style.overflow="";};
    serviceCards.forEach(card=>card.addEventListener("click",()=>{preview.src=card.dataset.serviceImage;preview.alt=card.querySelector("img").alt;caption.textContent=card.dataset.serviceTitle;lightbox.classList.add("is-open");document.body.style.overflow="hidden";close.focus();}));
    close.addEventListener("click",dismiss);
    lightbox.addEventListener("click",event=>{if(event.target===lightbox)dismiss();});
    document.addEventListener("keydown",event=>{if(event.key==="Escape")dismiss();});
  }
})();

(()=>{
  const cards=[...document.querySelectorAll(".project-card,[data-project-trigger]")];
  if(!cards.length)return;
  const drawer=document.createElement("div");
  drawer.className="project-drawer";
  drawer.setAttribute("role","dialog");
  drawer.setAttribute("aria-modal","true");
  drawer.innerHTML=`<div class="project-drawer-panel">
    <button class="project-drawer-close" type="button" aria-label="Close project details">Close ✕</button>
    <div class="project-drawer-media-col">
      <div class="drawer-photo-stream"></div>
    </div>
    <div class="project-drawer-copy">
      <div class="drawer-copy-inner">
        <p class="kicker" data-project-meta></p>
        <h2 data-project-title></h2>
        <p data-project-description></p>
        <div class="project-case-study" hidden>
          <p class="project-case-label">The project story</p>
          <dl>
            <div><dt>Brief</dt><dd data-project-brief></dd></div>
            <div><dt>Design</dt><dd data-project-design></dd></div>
            <div><dt>Delivery</dt><dd data-project-delivery></dd></div>
          </dl>
        </div>
        <div class="project-facts">
          <div><b>Scope</b><span data-project-scope></span></div>
          <div><b>Setting</b><span data-project-setting></span></div>
          <div><b>Care</b><span data-project-care></span></div>
        </div>
        <div class="drawer-consult-cta">
          <button class="drawer-consult-btn" type="button" onclick="if(window.openConsultModal){window.openConsultModal();}">Book Free Site Visit →</button>
        </div>
      </div>
    </div>
  </div>`;
  document.body.append(drawer);
  const close=drawer.querySelector(".project-drawer-close"),
        streamContainer=drawer.querySelector(".drawer-photo-stream"),
        mediaCol=drawer.querySelector(".project-drawer-media-col"),
        copyCol=drawer.querySelector(".project-drawer-copy"),
        meta=drawer.querySelector("[data-project-meta]"),
        title=drawer.querySelector("[data-project-title]"),
        description=drawer.querySelector("[data-project-description]"),
        caseStudy=drawer.querySelector(".project-case-study"),
        brief=drawer.querySelector("[data-project-brief]"),
        design=drawer.querySelector("[data-project-design]"),
        delivery=drawer.querySelector("[data-project-delivery]"),
        scope=drawer.querySelector("[data-project-scope]"),
        setting=drawer.querySelector("[data-project-setting]"),
        care=drawer.querySelector("[data-project-care]");

  let lastFocus;

  const dismiss=()=>{
    drawer.classList.remove("is-open");
    document.body.style.overflow="";
    if(lastFocus)lastFocus.focus();
  };

  cards.forEach(card=>{
    card.addEventListener("click",event=>{
      if(card.matches("a"))event.preventDefault();
      const isCaseStudy=card.dataset.projectCaseStudy==="true";
      lastFocus=card;
      meta.textContent=card.dataset.projectMeta;
      title.textContent=card.dataset.projectTitle;
      description.textContent=card.dataset.projectDescription;
      scope.textContent=card.dataset.projectScope;
      setting.textContent=card.dataset.projectSetting;
      care.textContent=card.dataset.projectCare;
      brief.textContent=card.dataset.projectBrief||"";
      design.textContent=card.dataset.projectDesign||"";
      delivery.textContent=card.dataset.projectDelivery||"";
      caseStudy.hidden=!isCaseStudy;
      drawer.classList.toggle("is-case-study",isCaseStudy);
      drawer.setAttribute("aria-label",card.dataset.projectTitle);

      const galleryData = card.dataset.projectGallery;
      let currentPhotos = [];
      if (galleryData) {
        currentPhotos = galleryData.split(',').map(s=>s.trim()).filter(Boolean);
      } else if (card.dataset.projectImage) {
        currentPhotos = [card.dataset.projectImage];
      }

      let streamHtml = '';
      if (currentPhotos.length > 1) {
        streamHtml += `<div class="drawer-photo-stream-header">
          <span class="stream-header-title">Project Photography</span>
          <span class="stream-header-count">${currentPhotos.length} Views</span>
        </div>`;
      }
      currentPhotos.forEach((src, idx)=>{
        const num = String(idx + 1).padStart(2, '0');
        streamHtml += `<figure class="drawer-photo-card">
          <img src="${src}" alt="${card.dataset.projectTitle} view ${idx + 1}" loading="lazy" />
          ${currentPhotos.length > 1 ? `<figcaption class="drawer-photo-badge">View ${num}</figcaption>` : ''}
        </figure>`;
      });
      streamContainer.innerHTML = streamHtml;

      if (mediaCol) mediaCol.scrollTop = 0;
      if (copyCol) copyCol.scrollTop = 0;

      drawer.classList.add("is-open");
      document.body.style.overflow="hidden";
      close.focus();
    });
  });

  close.addEventListener("click",dismiss);
  drawer.addEventListener("click",event=>{if(event.target===drawer)dismiss();});
  document.addEventListener("keydown",event=>{
    if(!drawer.classList.contains("is-open")) return;
    if(event.key==="Escape") dismiss();
  });
})();
