/* Demo catalog of standalone Autotech installation services. Prices, SKUs and parts are illustrative. */
window.BBY_DATA = {
  categories: {
    audio: "Car Audio Installation",
    accessory: "Car Accessory Installation",
    remote: "Remote Start & Security Installation"
  },

  // Shared "Features" copy, modeled on the live service PDP.
  features: [
    { h: "What to bring to your installation appointment", p: "Bring the hardware you want installed, your vehicle keys and any other parts you've purchased for the installation. Your appointment confirmation is in your Order Details." },
    { h: "Preparing your vehicle", p: "We'll go through a preinstallation checklist so we can return your vehicle in the same condition as when you dropped it off." },
    { h: "Professional look and functionality", p: "We'll securely mount your equipment in agreed-upon locations and conceal wiring for a professional look." },
    { h: "Final steps", p: "To finish, we'll perform a postinstallation checklist and give you a demonstration of the products." }
  ],

  services: [
    {
      sku: "6643429", icon: "dashcam2", category: "accessory",
      name: "Dash Camera with Rear Camera Installation",
      price: 149.99, rating: 4.6, reviews: 24, hours: 2,
      about: "Have your new dash and rear cameras installed neatly, reliably and professionally by a Geek Squad® Autotech. Standard installation doesn't include vehicle-specific parts or accessories. Your Autotech will provide an estimate before performing any work that requires an additional charge.",
      parts: [
        { id: "hw", name: "Dash cam hardwire kit with parking-mode cable", price: 19.99, required: true },
        { id: "ext", name: "Rear camera extension cable, 20 ft", price: 14.99, required: true }
      ]
    },
    {
      sku: "6414778", icon: "stereo", category: "audio", fit: "radio",
      name: "In-Dash Car Stereo Install with Touchscreen (Hardware Not Included)",
      price: 149.99, rating: 4.4, reviews: 6887, hours: 3,
      about: "A Geek Squad® Autotech will remove your factory radio and install your new touchscreen receiver, including Apple CarPlay® and Android Auto™ setup. Vehicle-specific dash kits, harnesses and interfaces are extra and will be confirmed for your vehicle.",
      parts: [
        { id: "dash", name: "Vehicle-specific dash kit", price: 24.99, required: true },
        { id: "harness", name: "Vehicle wiring harness", price: 19.99, required: true },
        { id: "swc", name: "Steering wheel control interface", price: 69.99, required: true },
        { id: "ant", name: "Antenna adapter", price: 9.99, required: true }
      ]
    },
    {
      sku: "6414776", icon: "stereo1din", category: "audio", fit: "radio",
      name: "In-Dash Car Stereo Install (Hardware Not Included)",
      price: 99.99, rating: 4.5, reviews: 2104, hours: 2,
      about: "A Geek Squad® Autotech will remove your factory radio and install your new non-touchscreen receiver, connected to your factory speakers and steering wheel controls. Vehicle-specific dash kits, harnesses and interfaces are extra and will be matched to your vehicle.",
      parts: [
        { id: "dash", name: "Vehicle-specific dash kit", price: 24.99, required: true },
        { id: "harness", name: "Vehicle wiring harness", price: 19.99, required: true },
        { id: "ant", name: "Antenna adapter", price: 9.99, required: true }
      ]
    },
    {
      sku: "6409117", icon: "dashcam", category: "accessory",
      name: "Dash Camera Install",
      price: 99.99, rating: 4.2, reviews: 715, hours: 1,
      about: "Get a front-facing dash camera hardwired to your vehicle's fuse box, with wiring concealed behind trim panels so there are no cords across your dash.",
      parts: [{ id: "hw", name: "Dash cam hardwire kit", price: 19.99, required: true }]
    },
    {
      sku: "6402288", icon: "remote", category: "remote",
      name: "Basic T-Harness Remote Start Installation",
      price: 149.99, rating: 4.7, reviews: 299, hours: 3,
      about: "A Geek Squad® Autotech will install your remote start system using a vehicle-specific T-harness for a clean, plug-in connection. Includes programming of up to two remotes and a function test.",
      parts: [
        { id: "tharness", name: "iDataStart T-Harness for your vehicle", price: 79.99, required: true },
        { id: "app", name: "Smartphone control module", price: 99.99, required: true }
      ]
    },
    {
      sku: "6402296", icon: "remote", category: "remote",
      name: "Remote Start and Security System Installation",
      price: 199.99, rating: 4.5, reviews: 1188, hours: 4,
      about: "Professional installation of a combination remote start and vehicle security system, including door, hood and trunk triggers, siren mounting and remote programming.",
      parts: [
        { id: "bypass", name: "Vehicle bypass module", price: 79.99, required: true },
        { id: "hood", name: "Hood pin switch", price: 14.99, required: true }
      ]
    },
    {
      sku: "6407350", icon: "mirror", category: "accessory",
      name: "Rearview Mirror and Backup Camera Installation",
      price: 209.99, rating: 4.1, reviews: 77, hours: 2.5,
      about: "Get a clearer view of what's happening behind your car. A Geek Squad® Autotech will install your new rearview mirror with integrated monitor and a backup camera. Additional materials fees may apply.",
      parts: [{ id: "mount", name: "Vehicle-specific mirror mount adapter", price: 29.99, required: true }]
    },
    {
      sku: "5197164", icon: "camera", category: "accessory",
      name: "Backup Camera Installation",
      price: 149.99, rating: 4.5, reviews: 964, hours: 2,
      about: "We'll mount your backup camera and route it to your receiver or display, with a reverse-trigger connection so it turns on automatically when you shift into reverse.",
      parts: [{ id: "cam", name: "Camera adapter harness", price: 29.99, required: true }]
    },
    {
      sku: "8801932", icon: "speaker", category: "audio", fit: "speakers",
      name: "Car Speaker Installation (Per Pair)",
      price: 99.99, rating: 4.7, reviews: 1730, hours: 1.5,
      about: "Replace one pair of factory speakers with aftermarket coaxial speakers. Adapter brackets and wiring harnesses may be required for your vehicle and will be matched to it.",
      parts: [
        { id: "brk", name: "Speaker adapter brackets", price: 14.99, required: true },
        { id: "wire", name: "Speaker wiring adapters", price: 12.99, required: true }
      ]
    },
    {
      sku: "1362527", icon: "component", category: "audio", fit: "speakers",
      name: "Component Speaker Installation (Per Pair)",
      price: 149.99, rating: 4.6, reviews: 612, hours: 2.5,
      about: "Install one pair of component speakers, with separate woofers, tweeters and crossovers, mounted and wired for the best sound staging. Adapter brackets and wiring harnesses will be matched to your vehicle.",
      parts: [
        { id: "brk", name: "Speaker adapter brackets", price: 14.99, required: true },
        { id: "wire", name: "Speaker wiring adapters", price: 12.99, required: true }
      ]
    },
    {
      sku: "6409141", icon: "amp", category: "audio", fit: "amp",
      name: "Car Amplifier Installation",
      price: 119.99, rating: 4.6, reviews: 842, hours: 2.5,
      about: "Install an amplifier to power your speakers or subwoofer, including power, ground and signal wiring plus gain setting and basic tuning.",
      parts: [
        { id: "kit", name: "Amplifier wiring kit, 8 gauge", price: 49.99, required: true },
        { id: "loc", name: "Line output converter", price: 34.99, required: true }
      ]
    },
    {
      sku: "6409158", icon: "sub", category: "audio",
      name: "Powered Subwoofer Installation",
      price: 119.99, rating: 4.6, reviews: 701, hours: 1.5,
      about: "Install a powered subwoofer with a built-in amplifier, including power, ground and remote turn-on wiring, signal connection to your radio, and level setting with a sound check before you leave.",
      parts: [{ id: "kit", name: "Powered subwoofer wiring kit", price: 29.99, required: true }]
    }
  ],

  // Vehicle-specific parts packages. A service with a matching `fit` kind and a vehicle in range
  // shows these grouped options instead of its generic parts. `rec` marks the recommended package.
  fitments: [
    {
      id: "jeep-wrangler-2011-2017-radio", kind: "radio", make: "Jeep", model: "Wrangler", years: [2011, 2017],
      groups: [
        { id: "kit", label: "Dash kit", pick: "one", options: [
          { sku: "8716124", model: "99-6511BB", name: "Metra - Dash Kit for Select 2007-2020 Jeep Dodge Volkswagen Ram Chrysler Mitsubishi DIN DDIN - Black", price: 19.99, avail: "store", rec: true, note: "Fits single-DIN and double-DIN radios" },
          { sku: "6678164", model: "DP-6511-JK", name: "Metra - Full Dash Replacement Radio Installation Kit for 2011-2018 Jeep Wrangler JK Vehicles - Black", price: 424.99, avail: "store" }
        ] },
        { id: "harness", label: "Wiring harness", pick: "one", options: [
          { sku: "6449797", model: "RP4-CH11", name: "PAC - Radio Replacement and Steering Wheel Control Interface for Select Chrysler, Dodge, Jeep, and RAM Vehicles - Blue", price: 139.99, avail: "store", rec: true },
          { sku: "6557864", model: "HRN-HRR-CH1", name: "Maestro - Wiring Harness for Select Chrysler, Dodge, and Jeep Vehicles 2007 and Up - Black", price: 239.98, avail: "store", note: "Requires SKU 2868626, included in price" }
        ] },
        { id: "antenna", label: "Antenna adapter", pick: "one", options: [
          { sku: "4642658", model: "40-EU10", name: "Metra - Antenna Adapter for Select 1997-2023 Ford Chevrolet Jeep Dodge GMC Volkswagen Kia Ram - Black", price: 19.99, avail: "store", rec: true },
          { sku: "4642747", model: "40-EU20", name: "Metra - Antenna Adapter Reverse for Select 1997-2023 Ford Chevrolet Jeep Dodge GMC Volkswagen Ram - Black", price: 14.99, avail: "store" }
        ] },
        { id: "extras", label: "Other adapters", pick: "any", options: [
          { sku: "6577864", model: "AXUSBM-B", name: "AXXESS - USB to Mini B Adapter Cable Interface for Select 2010-Up GM and Buick Vehicles - Multi", price: 11.99, avail: "online", rec: true },
          { sku: "4355900", model: "HRN-ANT-SAT1", name: "Maestro - Adapter for OEM Satellite Radio Antennas - Black/Gray", price: 16.99, avail: "store", note: "Keeps factory satellite radio working" }
        ] }
      ]
    },
    {
      id: "jeep-wrangler-2011-2017-speakers", kind: "speakers", make: "Jeep", model: "Wrangler", years: [2011, 2017],
      // Each service is one pair, so the shopper picks which pair. Both locations use the same parts.
      locations: [
        { id: "front", label: "Front speakers", where: "Dash", size: "6.5\"", note: "You can fit 6.75\" speakers in the front and rear without the speaker adapter plates." },
        { id: "rear", label: "Rear speakers", where: "Overhead", size: "6.75\"", impedance: "4 Ω" }
      ],
      groups: [
        { id: "bracket", label: "Speaker bracket", pick: "one", options: [
          { sku: "3206015", model: "82-6600", name: "Metra - Speaker Bracket for Select 1989-2023 Toyota Ford Chevrolet Jeep Honda Nissan Dodge - Black", price: 29.99, avail: "store", rec: true }
        ] },
        { id: "harness", label: "Speaker harness", pick: "one", options: [
          { sku: "6452764", model: "72-6514-12", name: "Metra - Speaker Harness for Select 2002-2023 Jeep Dodge Volkswagen Ram - Multi", price: 17.99, avail: "online", rec: true }
        ] },
        { id: "damping", label: "Sound damping", pick: "any", options: [
          { sku: "8685038", model: "SDHP-SK", name: "Metra - Ballistic Hollow Point Series Speaker Kit for Most Vehicles - Black", price: 29.99, avail: "store",
            note: "Reduces rattles and road noise around the speaker", labor: { sku: "2822093", name: "Sound damping labor", price: 29.99 } }
        ] }
      ]
    },
    {
      id: "toyota-tacoma-2018-2023-radio", kind: "radio", make: "Toyota", model: "Tacoma", years: [2018, 2023],
      groups: [
        { id: "kit", label: "Dash kit", pick: "one", options: [
          { sku: "5742105", model: "99-8251B", name: "Metra - Dash Kit for Select 2016-2023 Toyota Tacoma DIN DDIN - Matte Black", price: 27.99, avail: "store", rec: true, note: "Fits single-DIN and double-DIN radios" }
        ] },
        { id: "harness", label: "Wiring harness", pick: "one", options: [
          { sku: "6559356", model: "HRN-HRR-TO3", name: "Maestro - Wiring T-Harness for 2018+ Toyota Vehicles with HU Connectors - Black", price: 264.98, avail: "store", rec: true, note: "Requires SKU 2868626, included in price" }
        ] },
        { id: "antenna", label: "Antenna adapter", pick: "one", options: [
          { sku: "5576641", model: "40-LX11", name: "Metra - Antenna Adapter for Select 2007-2023 Toyota Subaru Lexus - Black", price: 17.99, avail: "store", rec: true },
          { sku: "5576669", model: "40-LX21", name: "Metra - Antenna Adapter Reverse for Select 2007-2023 Toyota Subaru Lexus - Black", price: 13.99, avail: "store" }
        ] },
        { id: "extras", label: "Other adapters", pick: "any", options: [
          { sku: "6577871", model: "AXUSB-TY4", name: "AXXESS - USB Adapter Cable Interface for Select 2012-Up Toyota and Lexus Vehicles - Multi", price: 14.99, avail: "online", rec: true },
          { sku: "5621716", model: "ACC-SAT-TO2", name: "iDatalink - Maestro Car Radio Adapter Cable - Black", price: 29.99, avail: "store", note: "Keeps factory satellite radio working" }
        ] }
      ]
    },
    {
      id: "toyota-tacoma-2018-2023-speakers", kind: "speakers", make: "Toyota", model: "Tacoma", years: [2018, 2023],
      locations: [
        { id: "front", label: "Front speakers", where: "Door", size: "6 x 9\"",
          note: "For 6.5\" speakers in the front with the tweeter replaced, use bracket 82-8147 (SKU 5228136) instead.",
          groups: [
            { id: "bracket", label: "Speaker bracket", pick: "one", options: [
              { sku: "5228067", model: "82-8146", name: "Metra - Speaker Bracket for Select 2001-2023 Toyota Nissan Subaru Lexus Buick Scion - Black", price: 22.99, avail: "store", rec: true }
            ] },
            { id: "harness", label: "Speaker harness", pick: "one", options: [
              { sku: "4224878", model: "72-8104", name: "Metra - Speaker Harness for Select 1987-2023 Toyota Chevrolet Honda Subaru Hyundai Chrysler - Multi", price: 11.99, avail: "store", rec: true }
            ] }
          ] },
        { id: "rear", label: "Rear speakers", where: "Door", size: "6.5\"",
          groups: [
            { id: "bracket", label: "Speaker bracket", pick: "one", options: [
              { sku: "3206015", model: "82-6600", name: "Metra - Speaker Bracket for Select 1989-2023 Toyota Ford Chevrolet Jeep Honda Nissan Dodge - Black", price: 29.99, avail: "store", rec: true }
            ] },
            { id: "harness", label: "Speaker harness", pick: "one", options: [
              { sku: "4224878", model: "72-8104", name: "Metra - Speaker Harness for Select 1987-2023 Toyota Chevrolet Honda Subaru Hyundai Chrysler - Multi", price: 11.99, avail: "store", rec: true }
            ] }
          ] }
      ]
    },
    {
      // Amplifier parts aren't vehicle-specific, so this package applies to every vehicle.
      id: "any-vehicle-amp", kind: "amp", universal: true,
      groups: [
        { id: "power", label: "Amplifier power kit", pick: "one", options: [
          { sku: "6349293", model: "46CK4", name: "KICKER - C-Series 4AWG 2-Channel Amplifier Power Kit - Gray/Blue", price: 109.99, avail: "store", rec: true }
        ] },
        { id: "loc", label: "Factory radio adapter", pick: "one", options: [
          { sku: "6367101", model: "46KISLOC2", name: "KICKER - K-Series Stereo Line-Output Converter with Remote Turn-On Output - Black", price: 19.99, avail: "store", rec: true, note: "2-channel line-output converter (LOC) for keeping your factory radio" }
        ] }
      ]
    }
  ],

  stores: [
    { id: "maple-grove", name: "Maple Grove", addr: "12059 Elm Creek Blvd N, Maple Grove, MN", dist: "2.4 mi" },
    { id: "maplewood", name: "Maplewood", addr: "1795 County Rd D E, Maplewood, MN", dist: "20.7 mi" },
    { id: "richfield", name: "Richfield", addr: "1000 W 78th St, Richfield, MN", dist: "17.9 mi" },
    { id: "eden-prairie", name: "Eden Prairie", addr: "8251 Flying Cloud Dr, Eden Prairie, MN", dist: "21.3 mi" }
  ],


  // Only the vehicles we have parts data for, with the model years that data covers.
  // An empty `trims` list means the vehicle has no trim choice.
  vehicles: [
    { make: "Jeep", model: "Wrangler", years: [2011, 2017], trims: [] },
    { make: "Toyota", model: "Tacoma", years: [2018, 2023], trims: [
      "Standard Key with Standard Audio", "Standard Key with JBL Amplified Audio",
      "Push-to-Start with Standard Audio", "Push-to-Start with JBL Amplified Audio"
    ] }
  ]};
