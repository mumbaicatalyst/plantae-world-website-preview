/**
 * Plantae World — Site Search Catalogue
 *
 * One entry per thing a visitor might look for. To add something new, add one line.
 *   t  : title shown in results
 *   d  : one-line description shown under the title
 *   k  : keywords / everyday phrases people might type (space or comma separated)
 *   u  : page (and optional #section) to open
 *   hl : (optional) heading text to scroll to and highlight on the destination page
 *   c  : category label shown on the result
 *   a  : (optional) action instead of navigation. "quote" opens the Request a Call & Quote form
 *   s  : (optional) project type pre-selected in the quote form when a = "quote"
 */
window.PLANTAE_SEARCH_INDEX = [
  /* ---------------------------------------------------------------- Actions */
  { c: 'Get in touch', t: 'Request a Call & Quote', a: 'quote',
    d: 'Tell us your requirements and a Plantae specialist will call you with a tailored quote.',
    k: 'quote quotation estimate price pricing cost how much budget rate rates charges enquiry inquiry enquire call me callback call back request call get started start project hire book appointment consultation consult talk speak discuss proposal cost price estimate quotation how much charges budget rates consultation request appointment landscaping landscape garden plants balcony terrace design build' },
  { c: 'Get in touch', t: 'Contact Plantae World', u: 'contact.html',
    d: 'Phone, WhatsApp, email and the enquiry form.',
    k: 'contact phone call number whatsapp email mail address location studio office reach message enquiry form get in touch support phone number telephone number call contact us address whatsapp inquiry enquiries' },
  { c: 'Get in touch', t: 'Visit Our Studio — Ballard Estate, Fort', u: 'plantae-luxe.html#store-experience',
    d: 'Visit the Plantae Luxe boutique on S.B. Singh Road, Fort, Mumbai.',
    k: 'studio store shop showroom address directions map fort ballard estate kamani chambers mumbai visit location nursery' },

  /* ------------------------------------------------- Services: exterior */
  { c: 'Services', t: 'Landscape Design & Masterplanning', u: 'services.html#architecture', hl: 'Exterior Architecture',
    d: 'Complete exterior landscape architecture, from concept to masterplan.',
    k: 'landscape design landscaping garden design garden designer landscape architect landscape architecture architect masterplan master plan site plan layout concept plan 3d render rendering exterior outdoor design planning consultant' },
  { c: 'Services', t: 'Softscape & Specimen Trees', u: 'services.html#architecture', hl: 'Softscape',
    d: 'Trees, lawns, shrubs, planting beds and statement specimen trees.',
    k: 'softscape trees tree planting specimen tree lawn grass turf shrubs hedges hedge planting beds flower beds borders palms mature trees transplant plantation greenery' },
  { c: 'Services', t: 'Hardscapes & Pavilions', u: 'services.html#architecture', hl: 'Hardscapes',
    d: 'Paving, decks, pergolas, gazebos, pavilions and outdoor structures.',
    k: 'hardscape hardscaping paving pavers deck decking wooden deck pergola gazebo pavilion cabana shed seating area outdoor kitchen barbecue bbq fire pit patio walkway pathway path driveway steps staircase structure shade' },
  { c: 'Services', t: 'Stonework & Masonry', u: 'services.html#architecture', hl: 'Stonework',
    d: 'Natural stone, retaining walls, boundary walls and masonry features.',
    k: 'stone stonework masonry retaining wall boundary wall compound wall rockery rock garden boulders cobble cobblestone natural stone granite kota sandstone cladding brickwork' },
  { c: 'Services', t: 'Terrace & Sky Gardens', u: 'services.html#architecture', hl: 'Terrace',
    d: 'Rooftop and penthouse gardens designed for light, wind and weight.',
    k: 'terrace terrace garden terrace design roof rooftop roof garden roof top sky garden penthouse podium podium garden deck garden waterproofing high rise high-rise tower building terrace roof terrace rooftop roofdeck terrace gardening roof top top floor balcony terrace garden roof garden open terrace' },
  { c: 'Services', t: 'Balcony Gardens', u: 'design-and-build.html#track-apartment-design',
    d: 'Plants and planters designed for apartment balconies and small spaces.',
    k: 'balcony balcony garden balcony design apartment flat small space small garden compact planters railing planters window box high rise high-rise society sunlight shade balcony balcony makeover balcony landscaping flat balcony plants balcony decor apartment terrace apartment garden small balcony' },
  { c: 'Services', t: 'Farmhouse & Estate Landscaping', u: 'design-and-build.html#track-full-design-build',
    d: 'Large-scale landscaping for farmhouses, villas, resorts and private estates.',
    k: 'farmhouse farm house estate villa bungalow resort homestay weekend home alibaug lonavala khandala matheran mahabaleshwar panchgani acres acre large garden private estate country estate grounds farm house farm houses farmhouse garden farm land weekend house villa landscaping bungalow landscaping' },
  { c: 'Services', t: 'Villa & Bungalow Gardens', u: 'design-and-build.html#track-full-design-build',
    d: 'Front yards, back yards and complete garden makeovers for independent homes.',
    k: 'villa bungalow independent house home garden front yard backyard back yard makeover renovation garden renovation redesign revamp house garden row house' },
  { c: 'Services', t: 'Commercial & Corporate Landscaping', u: 'services.html',
    d: 'Greenery for offices, hotels, restaurants, retail and corporate headquarters.',
    k: 'commercial corporate office offices hotel hotels restaurant cafe retail mall showroom hospitality campus headquarters workplace business lobby reception common area society housing society clubhouse' },

  /* ------------------------------------- Services: living systems & plants */
  { c: 'Services', t: 'Vertical Living Walls', u: 'services.html#living-systems', hl: 'Vertical Living Walls',
    d: 'Green walls and vertical gardens with built-in irrigation.',
    k: 'vertical garden green wall living wall wall garden plant wall moss wall vertical greenery wall planter indoor wall outdoor wall facade green wall plant wall living wall vertical wall garden vertical gardens vertical gardening' },
  { c: 'Services', t: 'Expert Plant Selection', u: 'services.html#living-systems', hl: 'Expert Plant Selection',
    d: 'The right plants for your light, climate and lifestyle.',
    k: 'plant selection which plants best plants low maintenance easy plants shade plants sun plants indoor plants outdoor plants flowering plants native plants exotic plants fragrant plants air purifying plants advice recommend nursery plant list palms ferns orchids succulents bonsai plant selection plant recommendation plant consultant buy plant houseplant house plants indoor plant selection plant doctor' },
  { c: 'Services', t: 'Precision Fertigation', u: 'services.html#living-systems', hl: 'Precision Fertigation',
    d: 'Automated delivery of water and nutrients directly to the roots.',
    k: 'fertigation fertilizer fertiliser feeding nutrients nutrition plant food automated feeding dosing' },
  { c: 'Services', t: 'Indoor Gardens & Atriums', u: 'services.html#living-systems', hl: 'Indoor Gardens',
    d: 'Interior planting for atriums, lobbies, living rooms and offices.',
    k: 'indoor garden indoor plants interior landscaping interiorscape atrium lobby living room home office plantscaping plantscape office plants decor greenery interiors courtyard conservatory indoor plant design interior plants house plants indoor greenery houseplant plant styling' },

  /* ----------------------------------------- Services: water, irrigation, light */
  { c: 'Services', t: 'Automated Drip Irrigation', u: 'services.html#water-lighting', hl: 'Automated Drip Irrigation',
    d: 'Smart watering systems that save water and keep plants healthy.',
    k: 'irrigation drip irrigation sprinkler sprinklers watering automatic watering auto watering timer smart irrigation water saving garden watering system pipes controller holiday watering automatic irrigation drip system irrigation system auto water watering drip watering sprinkler system garden irrigation' },
  { c: 'Services', t: 'Waterfalls & Water Walls', u: 'services.html#water-lighting', hl: 'Waterfalls',
    d: 'Cascading waterfalls and flowing water feature walls.',
    k: 'waterfall water wall water feature cascade cascading flowing water rain curtain wall fountain feature waterfall waterfall feature water fountain water feature cascading water' },
  { c: 'Services', t: 'Fountains & Ecosystem Ponds', u: 'services.html#water-lighting', hl: 'Fountains',
    d: 'Fountains, koi ponds, lily ponds and natural pond ecosystems.',
    k: 'fountain fountains pond ponds koi pond fish pond lily pond water body water garden pool pondless reflecting pool natural pond aquatic plants swimming pool landscape water fountain water feature fishpond koi fish pond fish ponds lily pond pond design' },
  { c: 'Services', t: 'Architectural Night Lighting', u: 'services.html#water-lighting', hl: 'Architectural Night Lighting',
    d: 'Garden and facade lighting that makes your landscape glow after dark.',
    k: 'lighting garden lights outdoor lights night lighting landscape lighting spotlight uplighter path lights led lights lamp lamps facade lighting ambience ambiance illumination evening garden lights outdoor lighting exterior lights garden light landscape lights' },

  /* ---------------------------------------------- Services: care & upkeep */
  { c: 'Services', t: 'Annual Maintenance (AMC)', u: 'services.html#maintenance', hl: 'Annual Maintenance',
    d: 'Yearly maintenance contracts to keep your garden in top condition.',
    k: 'maintenance amc annual maintenance contract garden maintenance gardener gardening service garden care upkeep monthly service regular visits caretaker mali lawn mowing weeding watering service contract maintenance garden upkeep gardening gardener maali mali maliwala maaliwala garden service garden cleaning plant maintenance plant care' },
  { c: 'Services', t: 'Structural Pruning & Topiary', u: 'services.html#maintenance', hl: 'Structural Pruning',
    d: 'Expert pruning, shaping, hedge trimming and topiary.',
    k: 'pruning trimming tree trimming hedge trimming cutting topiary shaping bonsai tree care arborist tree surgeon branches canopy' },
  { c: 'Services', t: 'Organic Soil Nutrition', u: 'services.html#maintenance', hl: 'Organic Soil Nutrition',
    d: 'Compost, soil health and organic feeding programmes.',
    k: 'soil organic compost manure vermicompost mulch mulching potting mix soil health soil testing fertile soil nutrition natural fertiliser' },
  { c: 'Services', t: 'Integrated Pest Management', u: 'services.html#maintenance', hl: 'Integrated Pest Management',
    d: 'Safe, effective pest and disease control for plants.',
    k: 'pest pest control insects bugs disease fungus fungal infection termite termites aphids mealybug spray plant disease organic pest control plant protection ipm sick plant dying plant yellow leaves pest infestation bugs insects fungus mealybugs aphids yellowing dying plants plant doctor' },

  /* ------------------------------------------------------ Design & build */
  { c: 'How we work', t: 'Full Design & Build (Turnkey)', u: 'design-and-build.html#track-full-design-build',
    d: 'One team from concept and drawings to construction and planting.',
    k: 'design and build design build turnkey full project end to end one stop contractor contracting construction execution implementation landscape contractor boq bill of quantities fixed price handover process steps timeline complete design build construction execution turnkey landscaping start to finish full service' },
  { c: 'How we work', t: 'Apartment & Balcony Design Process', u: 'design-and-build.html#track-apartment-design',
    d: 'How we design and plant apartments, balconies and terraces, step by step.',
    k: 'apartment process flat balcony design steps how it works process step by step society permission' },
  { c: 'How we work', t: 'Plant Selection Process', u: 'design-and-build.html#track-plant-selection',
    d: 'How we choose, source and deliver the right plants for you.',
    k: 'plant selection process buy plants sourcing delivery nursery visit choose plants plant supply plants supply' },
  { c: 'How we work', t: 'Our Design & Build Process', u: 'design-and-build.html#process-journey',
    d: 'The journey from first conversation to a finished living landscape.',
    k: 'process how does it work steps stages journey timeline site assessment survey measurement design drawings approval installation handover warranty health warranty' },

  /* ------------------------------------------------------ Projects */
  { c: 'Projects', t: 'Our Projects & Portfolio', u: 'selected-works.html',
    d: 'Selected landscapes, terraces, balconies and estates we have created.',
    k: 'projects portfolio work works past work gallery photos pictures images examples case studies previous projects before after completed selected works inspiration ideas case study case studies project examples past projects previous work portfolio gallery photos' },


  /* Individual projects, drawn from the portfolio cards. */
  {"c": "Projects", "t": "Large Terrace Design & Build", "d": "Private Residence . South Mumbai — A South Mumbai penthouse shaped around privacy, greenery, and an uninterrupted view of the Arabian Sea.", "k": "project portfolio case study PRIVATE RESIDENCE . SOUTH MUMBAI Terrace planting, living wall, and evening lighting. A private high-rise home in South Mumbai.", "u": "selected-works.html#project-archive", "hl": "Large Terrace Design & Build"},
  {"c": "Projects", "t": "The Monsoon Garden", "d": "Large Estate · Alibaug — An estate landscape shaped by Alibaug’s seasonal rains, with resilient planting, considered water management and open views across the trees.", "k": "project portfolio case study Large Estate · Alibaug Outdoor planting, irrigation, drainage response and water elements. An estate in Alibaug, Maharashtra, planned around monsoon seasonality and long views across the palms.", "u": "selected-works.html#project-archive", "hl": "The Monsoon Garden"},
  {"c": "Projects", "t": "Riverfront Retreat Design & Build", "d": "Private Farmhouse · Karjat — A 2-acre farmhouse that brings together a villa, pool, mature mango orchard and a sequence of outdoor spaces leading to the river.", "k": "project portfolio case study PRIVATE FARMHOUSE · KARJAT Landscape planning for a 2-acre riverfront property, including planting, pathways, poolside and riverfront spaces, outdoor seating, and the existing mango orchard. A private riverfront farmhouse property in Karjat.", "u": "selected-works.html#project-archive", "hl": "Riverfront Retreat Design & Build"},
  {"c": "Projects", "t": "Entire Resort Landscape Design & Build", "d": "Breathe Woods Resort . Raigad — A landscape that belongs in the woods, with quarterly care to keep the grounds looking their best through the seasons.", "k": "project portfolio case study BREATHE WOODS RESORT . RAIGAD Resort-wide planting (flowers, bushes, trees), lawn care, paver paths and water fountains. 6.5 acre wooded resort near Raigad, Maharashtra.", "u": "selected-works.html#project-archive", "hl": "Entire Resort Landscape Design & Build"},
  {"c": "Projects", "t": "Extensive Resort Landscape Revamp", "d": "Private Resort . Matheran — A forest-sensitive landscape plan for a 3.57-acre resort near Alexander Point, Matheran protecting approximately two acres of forest while planning guest pathways, cottage gardens, and shared spaces.", "k": "project portfolio case study PRIVATE RESORT . MATHERAN Entire 3.6 acre resort including entrance design, around recreation areas, cottages, dining, and pathways across the property. Alexander Point, Matheran", "u": "selected-works.html#project-archive", "hl": "Extensive Resort Landscape Revamp"},
  {"c": "Projects", "t": "Beautiful Acoustic Canopy", "d": "Multi-Story Residential Parking Garage · Mumbai — A planted arrival wall that adds texture, softens sound, and makes a boring residential parking garage more welcoming.", "k": "project portfolio case study Multi-story Residential Parking Garage · Mumbai Planting along parking garage exterior across several floors. Easy to maintain, low water plant species that do well in direct and partial shade sunlight. A contemporary multi-storey building in Mumbai.", "u": "selected-works.html#project-archive", "hl": "Beautiful Acoustic Canopy"},
  {"c": "Projects", "t": "Greener Bandra Streets", "d": "Road Divider . Bandra, Mumbai — Landscape for two road divider patches across busy roadways in Bandra", "k": "project portfolio case study ROAD DIVIDER . BANDRA, MUMBAI Two road dividers, including sections approximately 9 inches, 27 inches and 55 inches wide. About 1.1 Km in total length Linking Road and KC Road, Bandra, Mumbai.", "u": "selected-works.html#project-archive", "hl": "Greener Bandra Streets"},
  {"c": "Projects", "t": "Entire Duplex Flat Plants Design & Build", "d": "Boranas Residence . Suburban Mumbai — A room-by-room planting concept for a spacious duplex apartment in the heart of western suburban Mumbai.", "k": "project portfolio case study BORANAS RESIDENCE . SUBURBAN MUMBAI Duplex room-by-room planting, balcony sanctuary & vertical living accents. A private high-rise duplex in suburban Mumbai.", "u": "selected-works.html#project-archive", "hl": "Entire Duplex Flat Plants Design & Build"},
  {"c": "Projects", "t": "Plant Selection at a Rental Flat", "d": "Hafizjee Residence . Central Mumbai — Plant Selection for a large living room of a rental apartment, to help them on their plant parenthood journey", "k": "project portfolio case study HAFIZJEE RESIDENCE . CENTRAL MUMBAI Living room plant selection, styling in client planters & low-water plant placement. A private high-rise rental flat in central Mumbai.", "u": "selected-works.html#project-archive", "hl": "Plant Selection at a Rental Flat"},
  {"c": "Projects", "t": "Biophilic Common Area", "d": "Corporate Office . Bandra Kurla Complex — A workplace meeting and relaxation area shaped around greenery, with architectural specimen trees, living corridors and easy semi-automated irrigation integrated into the planters.", "k": "project portfolio case study Corporate Office . Bandra Kurla Complex Workspace masterplan and common areas landscape, including architectural specimen trees, living green corridors and sub-irrigation. A flagship corporate headquarter in Bandra Kurla Complex (BKC), Mumbai.", "u": "selected-works.html#project-archive", "hl": "Biophilic Common Area"},

  /* --------------------------------------------------------- Plantae Luxe */
  { c: 'Plantae Luxe', t: 'Plantae Luxe Boutique', u: 'plantae-luxe.html',
    d: 'Our boutique for rare plants, artisan planters and botanical gifting.',
    k: 'luxe plantae luxe boutique plant shop buy plants online store retail curated collections plante luxe lux plant lux plantay lux plantae lux boutique plant boutique plant nursery plant store plants shop store fort' },
  { c: 'Plantae Luxe', t: 'Rare & Unique Plant Specimens', u: 'plantae-luxe.html#categories', hl: 'Unique',
    d: 'Rare, collector and statement plants.',
    k: 'rare plants unique plants collector plants exotic plants specimens variegated monstera philodendron anthurium alocasia statement plant houseplants house plants' },
  { c: 'Plantae Luxe', t: 'Sculptural Artisan Planters', u: 'plantae-luxe.html#categories', hl: 'Sculptural',
    d: 'Handcrafted pots and designer planters.',
    k: 'planters pots pot designer planters ceramic pots terracotta artisan planters vases containers handcrafted fibreglass fiberglass urns plant pots plant pot ceramic pot planter designer pots decorative pots' },
  { c: 'Plantae Luxe', t: 'Botanical Hampers & Gifting', u: 'plantae-luxe.html#categories', hl: 'Hampers',
    d: 'Plant hampers and thoughtful botanical gifts.',
    k: 'gift gifts gifting hamper hampers corporate gifting wedding favours festive diwali housewarming birthday return gifts plant gift plant gifts plant gifting corporate gifts diwali gifts house warming gifts wedding gifts birthday gifts' },
  { c: 'Plantae Luxe', t: 'Signature Plant Arrangements', u: 'plantae-luxe.html#arrangements',
    d: 'Ready-made groupings of plants and planters for your space.',
    k: 'arrangements plant arrangement potted plant grouping signature formations decor styling table plants centrepiece' },
  { c: 'Plantae Luxe', t: 'Virtual Consultations & Live Shopping', u: 'plantae-luxe.html#virtual-consultation',
    d: 'Choose plants over a video call with our team.',
    k: 'virtual consultation video call live shopping online consultation zoom remote plant advice video shopping video consultation video call shop from home online shopping virtual shopping' },
  { c: 'Plantae Luxe', t: 'Plant Care Guide', u: 'plantae-luxe.html#care-guide',
    d: 'Simple rituals to keep your plants thriving.',
    k: 'care guide plant care how to care watering schedule light needs tips dying plant yellow leaves repotting fertilising help' },

  /* ------------------------------------------------------------ Pages */
  { c: 'Pages', t: 'About Plantae World', u: 'about.html',
    d: 'Our story, our 1983 heritage, nursery lineage and multidisciplinary practice.',
    k: 'about about us story history heritage who we are company background parasnath enterprises 1983 nursery karjat ballard estate lineage team plantay world plante plantae history about company founder founders team' },
  { c: 'Leadership', t: 'Partners & Leadership Team', u: 'about.html#partners',
    d: 'Meet Shruti Sanghvi, Yogesh Shah, Prashant Sanil, and Dennis.',
    k: 'partners leadership team directors management who runs plantae founders who owns plantae people partners team heads' },
  { c: 'Leadership', t: 'Shruti Sanghvi', u: 'about.html#partners',
    d: 'Founder & Managing Director · Strategy & Design.',
    k: 'shruti sanghvi shruti founder managing director lead designer architect strategy design' },
  { c: 'Leadership', t: 'Yogesh Shah', u: 'about.html#partners',
    d: 'Founder (Parasnath Enterprises) & Director · Projects & Site Coordination.',
    k: 'yogesh shah yogesh founder parasnath director projects client coordination site management execution 40 years' },
  { c: 'Leadership', t: 'Prashant Sanil', u: 'about.html#partners',
    d: 'Director · Operations & Sourcing Head.',
    k: 'prashant sanil prashant director operations procurement head plant sourcing nursery grower network logistics' },
  { c: 'Leadership', t: 'Dennis', u: 'about.html#partners',
    d: 'Director of Operations · Luxury Hospitality & Client Experience.',
    k: 'dennis director operations hospitality guest experience service standards delivery execution luxury' },
  { c: 'Credibility', t: 'Client Roster & Institutional Wins', u: 'about.html#clients',
    d: 'Trusted across Oberoi, Citibank, RBI, P&G, Titan, Reliance, and celebrity private estates.',
    k: 'clients credentials logos customer wins credibility reputation references oberoi ramada p&g titan rbi reserve bank citibank reliance ongc union bank adcb indian navy dino morea anil kapoor shaina nc shaila merchant' },
  { c: 'Philosophy', t: 'The Right Plant Is Never Just a Name on a List', u: 'about.html#sourcing-title',
    d: 'Handpicked specimen curation, grower networks, and climate-engineered longevity.',
    k: 'sourcing handpicked plants specimen trees nursery selection quality over convenience soil climate drainage longevity specimen plants' },
  { c: 'Pages', t: 'All Services', u: 'services.html',
    d: 'Everything Plantae offers, from design to long-term care.',
    k: 'services what we do what do you do offerings scope range everything list landscaping services' },
  { c: 'Pages', t: 'Where We Work — Mumbai, Alibaug & Beyond', u: 'design-and-build.html#process-journey',
    d: 'Mumbai, MMR, Alibaug, Lonavala, hill stations and select destination projects across India.',
    k: 'areas location locations city cities service area do you work in mumbai navi mumbai thane pune alibaug lonavala khandala matheran mahabaleshwar panchgani chennai india pan india mmr western ghats' }
];
