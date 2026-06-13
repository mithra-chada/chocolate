export interface Product {
  id: number;
  name: string;

  slug: string;
  description: string;
  price: number;
  comparePrice: number | null;
  image: string;
  images?: string; // JSON array of string
  weight: string;
  isSeasonal: boolean;
  featured: boolean;
  category: string;
  rating: number;
  reviewCount: number;
  cacaoPercentage: number | null;
  origin: string | null;
  ingredients: string | null;
  allergens: string | null;
  createdAt: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  createdAt: string;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Mythical Dark Single-Origin",
    slug: "mythical-dark-single-origin",
    description: "Our signature bar. Crafted from rare 75% heirloom Criollo beans sourced from our foothills estate. Experience notes of wild blackberry, roasted macadamia, and a warm honeyed finish.",
    price: 349,
    comparePrice: null,
    image: "/images/product-dark-origin.jpg",
    images: JSON.stringify(["/images/product-dark-origin.jpg", "/images/process-roast.jpg", "/images/process-conching.jpg"]),
    weight: "70g",
    isSeasonal: false,
    featured: true,
    category: "dark",
    rating: 4.9,
    reviewCount: 124,
    cacaoPercentage: 75,
    origin: "Sambirano Valley, Madagascar",
    ingredients: "Organic Cacao Beans, Organic Cane Sugar, Organic Cocoa Butter.",
    allergens: "Made in a facility that also processes tree nuts and milk.",
    createdAt: "2026-01-15T08:00:00Z"
  },
  {
    id: 2,
    name: "Golden Milk Silk",
    slug: "golden-milk-silk",
    description: "A rich 45% milk chocolate that redefines the category. Made with organic grass-fed milk and heirloom cacao, finished with a pinch of hand-harvested fleur de sel and Madagascar vanilla.",
    price: 299,
    comparePrice: null,
    image: "/images/product-milk-silk.jpg",
    images: JSON.stringify(["/images/product-milk-silk.jpg", "/images/process-tempering.jpg"]),
    weight: "70g",
    isSeasonal: false,
    featured: true,
    category: "milk",
    rating: 4.8,
    reviewCount: 98,
    cacaoPercentage: 45,
    origin: "Foothills Estate, South America",
    ingredients: "Organic Cane Sugar, Organic Cacao Beans, Organic Cocoa Butter, Organic Milk Powder, Fleur de Sel, Organic Vanilla Bean.",
    allergens: "Contains Milk. Made in a facility that also processes tree nuts.",
    createdAt: "2026-01-20T08:00:00Z"
  },
  {
    id: 3,
    name: "The Signature Collection",
    slug: "the-signature-collection",
    description: "A gorgeous curated box containing our bestseller dark and milk chocolate bars, paired with a custom wooden tasting board and flavor-mapping guide.",
    price: 749,
    comparePrice: 799,
    image: "/images/product-seasonal-set.jpg",
    images: JSON.stringify(["/images/product-seasonal-set.jpg", "/images/process-gift-box.jpg"]),
    weight: "280g",
    isSeasonal: true,
    featured: true,
    category: "gift",
    rating: 5.0,
    reviewCount: 42,
    cacaoPercentage: null,
    origin: "Multi-Origin Assortment",
    ingredients: "Includes multiple bars. Refer to individual wrappers for ingredients.",
    allergens: "Contains Milk. Made in a facility that also processes tree nuts.",
    createdAt: "2026-02-01T08:00:00Z"
  },
  {
    id: 4,
    name: "Heirloom Ganache Bonbons",
    slug: "heirloom-ganache-bonbons",
    description: "An exquisite 12-piece assortment of hand-painted bonbons. Filled with silky single-origin ganache, salted caramel, infused botanicals, and seasonal fruit reductions.",
    price: 699,
    comparePrice: null,
    image: "/images/product-bonbons.jpg",
    images: JSON.stringify(["/images/product-bonbons.jpg", "/images/process-molding.jpg"]),
    weight: "180g",
    isSeasonal: true,
    featured: true,
    category: "bonbon",
    rating: 4.9,
    reviewCount: 56,
    cacaoPercentage: 68,
    origin: "Artisan Atelier, Foothills",
    ingredients: "Organic Cacao Beans, Organic Cane Sugar, Cocoa Butter, Fresh Cream, Butter, Organic Honey, Natural Fruit & Botanical Extract.",
    allergens: "Contains Milk, Soy. Made in a facility that also processes tree nuts and wheat.",
    createdAt: "2026-02-10T08:00:00Z"
  },
  {
    id: 5,
    name: "Ceremonial Cacao Nib Blend",
    slug: "ceremonial-cacao-nib-blend",
    description: "Gently roasted, lightly crushed heirloom cacao nibs. Packed with antioxidants and rich chocolate aroma. Perfect for breakfast bowls, baking, or straight snacking.",
    price: 399,
    comparePrice: null,
    image: "/images/process-roast.jpg",
    images: JSON.stringify(["/images/process-roast.jpg"]),
    weight: "250g",
    isSeasonal: false,
    featured: false,
    category: "bulk",
    rating: 4.7,
    reviewCount: 38,
    cacaoPercentage: 100,
    origin: "Sambirano Valley, Madagascar",
    ingredients: "100% Organic Cacao Nibs.",
    allergens: "Made in a nut-free facility.",
    createdAt: "2026-01-05T08:00:00Z"
  },
  {
    id: 6,
    name: "Wild-Harvested Cacao Powder",
    slug: "wild-harvested-cacao-powder",
    description: "Superfood grade, cold-pressed raw cacao powder. Rich, intense chocolate flavor with zero sugar. Ideal for premium baking, smoothies, or functional drinks.",
    price: 349,
    comparePrice: null,
    image: "/images/process-final.jpg",
    images: JSON.stringify(["/images/process-final.jpg"]),
    weight: "300g",
    isSeasonal: false,
    featured: false,
    category: "bulk",
    rating: 4.8,
    reviewCount: 74,
    cacaoPercentage: 100,
    origin: "Ecuadorian Amazon",
    ingredients: "100% Organic Cold-Pressed Cacao Powder.",
    allergens: "Made in a nut-free facility.",
    createdAt: "2026-01-08T08:00:00Z"
  },
  {
    id: 7,
    name: "Roasted Heirloom Beans",
    slug: "roasted-heirloom-beans",
    description: "Whole cacao beans roasted to highlight their natural floral and fruit profile. Crack and peel to enjoy the purest chocolate taste experience.",
    price: 299,
    comparePrice: null,
    image: "/images/process-drying.jpg",
    images: JSON.stringify(["/images/process-drying.jpg"]),
    weight: "200g",
    isSeasonal: false,
    featured: false,
    category: "bulk",
    rating: 4.6,
    reviewCount: 22,
    cacaoPercentage: 100,
    origin: "Foothills Estate",
    ingredients: "100% Roasted Whole Cacao Beans.",
    allergens: "None.",
    createdAt: "2026-01-12T08:00:00Z"
  },
  {
    id: 8,
    name: "Artisan Fleur de Sel Dark",
    slug: "artisan-fleur-de-sel-dark",
    description: "A exquisite combination of 70% dark chocolate and delicate crystals of hand-harvested sea salt. The perfect balance of sweet, bitter, and savory.",
    price: 329,
    comparePrice: null,
    image: "/images/product-dark-origin.jpg",
    images: JSON.stringify(["/images/product-dark-origin.jpg"]),
    weight: "70g",
    isSeasonal: false,
    featured: false,
    category: "dark",
    rating: 4.8,
    reviewCount: 65,
    cacaoPercentage: 70,
    origin: "Foothills Estate, South America",
    ingredients: "Organic Cacao Beans, Organic Cane Sugar, Organic Cocoa Butter, Fleur de Sel.",
    allergens: "Made in a facility that also processes tree nuts and milk.",
    createdAt: "2026-02-15T08:00:00Z"
  },
  {
    id: 9,
    name: "Single-Origin Pod Selection",
    slug: "single-origin-pod-selection",
    description: "Three micro-batch bars, each showcasing the distinct terroir of Madagascar, Ecuador, and our estate. Complete with analytical tasting wheels.",
    price: 649,
    comparePrice: 749,
    image: "/images/process-gift-box.jpg",
    images: JSON.stringify(["/images/process-gift-box.jpg"]),
    weight: "210g",
    isSeasonal: false,
    featured: false,
    category: "gift",
    rating: 4.9,
    reviewCount: 19,
    cacaoPercentage: 72,
    origin: "Madagascar, Ecuador, Estate",
    ingredients: "Organic Cacao Beans, Organic Cane Sugar, Organic Cocoa Butter.",
    allergens: "Made in a facility that also processes tree nuts and milk.",
    createdAt: "2026-02-18T08:00:00Z"
  },
  {
    id: 10,
    name: "Madagascar Vanilla Milk",
    slug: "madagascar-vanilla-milk",
    description: "A premium 38% milk chocolate infused with fragrant, freshly-scraped Madagascar Bourbon vanilla beans and organic raw milk solids.",
    price: 289,
    comparePrice: null,
    image: "/images/product-milk-silk.jpg",
    images: JSON.stringify(["/images/product-milk-silk.jpg"]),
    weight: "70g",
    isSeasonal: false,
    featured: false,
    category: "milk",
    rating: 4.7,
    reviewCount: 52,
    cacaoPercentage: 38,
    origin: "Sambirano Valley, Madagascar",
    ingredients: "Organic Cane Sugar, Organic Cocoa Butter, Organic Milk Powder, Organic Cacao Beans, Bourbon Vanilla Beans.",
    allergens: "Contains Milk. Made in a facility that also processes tree nuts.",
    createdAt: "2026-02-22T08:00:00Z"
  }
];

export const mockPosts: BlogPost[] = [
  // RECIPES
  {
    id: 1,
    title: "The Ultimate Dark Chocolate Soufflé",
    slug: "ultimate-dark-chocolate-souffle",
    excerpt: "A decadent, light-as-air dessert crafted from our Mythical Dark 75% bar. Perfect for special moments.",
    category: "recipes",
    image: "/images/journal-ganache.jpg",
    author: "Chef Antoine Laurent",
    createdAt: "2026-04-10T10:00:00Z",
    content: `A soufflé has a reputation for being temperamental, but with proper technique and premium chocolate, it is highly rewarding. We recommend using our Mythical Dark 75% bar because its balanced acidity cuts through the richness of the egg yolks, while its robust cacao percentage ensures a bold flavor profile.

Ingredients:
- 150g Mythical Dark 75% Chocolate, chopped
- 4 large organic eggs, separated
- 40g organic cane sugar (plus more for coating the ramekins)
- 30g unsalted butter (for greasing)
- 1 tbsp high-quality cocoa powder
- 1/4 tsp cream of tartar
- A pinch of fine sea salt

Instructions:
1. Prep the Ramekins: Butter four 6-ounce ramekins using upward vertical strokes. Dust the insides with cane sugar, tapping out the excess. This gives the soufflé batter traction to rise evenly.
2. Melt the Chocolate: Create a double boiler by placing a heatproof bowl over a pot of simmering water (ensuring the bowl doesn't touch the water). Melt the chopped chocolate and butter, stirring occasionally until glossy and smooth. Remove from heat and let cool slightly.
3. Whisk the Yolks: Whisk the 4 egg yolks into the warm chocolate mixture one at a time until completely incorporated and smooth.
4. Whip the Egg Whites: In a clean glass bowl, whip the egg whites, salt, and cream of tartar to soft peaks. Gradually stream in the sugar while continuing to whip to firm, glossy peaks (do not over-whip).
5. Fold Gently: Fold a third of the whipped whites into the chocolate mixture to lighten the batter. Gently fold in the remaining whites in two batches, being careful not to deflate the structure.
6. Bake: Divide the mixture among the prepared ramekins. Run your thumb around the inside rim of each ramekin to create a clean channel. Bake at 375°F (190°C) for 12-14 minutes until risen but still slightly jiggly in the center. Serve immediately with vanilla cream.`
  },
  {
    id: 2,
    title: "Decadent Sea Salt Ganache Truffles",
    slug: "decadent-sea-salt-ganache-truffles",
    excerpt: "Learn the secrets to creating silky, melt-in-your-mouth ganache truffles dusted with premium cocoa powder.",
    category: "recipes",
    image: "/images/product-bonbons.jpg",
    author: "Elena Rostov",
    createdAt: "2026-04-18T10:00:00Z",
    content: `Chocolate truffles are the ultimate expression of simplicity. With only a handful of ingredients, the quality of your chocolate and dairy is paramount. A true ganache is an emulsion—combining fat and water into a smooth, glossy paste that melts at body temperature.

Ingredients:
- 200g Mythical Dark Single-Origin 75%
- 120ml organic heavy cream (36% fat)
- 15g raw meadow honey
- 15g unsalted grass-fed butter, room temperature
- Premium cocoa powder (for dusting)
- Coarse sea salt (fleur de sel)

Instructions:
1. Chop the Chocolate: Finely chop the chocolate using a serrated knife. Place it into a medium glass bowl.
2. Heat the Cream: In a small saucepan, combine the heavy cream and honey. Bring to a gentle simmer—do not boil.
3. Form the Emulsion: Pour the hot cream over the chopped chocolate. Let it sit undisturbed for 2 minutes to melt the cacao solids. Using a silicone spatula, slowly stir in small concentric circles from the center outwards until an emulsion forms and the mixture is dark and glossy.
4. Add Butter & Salt: Add the softened butter and a pinch of fleur de sel. Stir gently until completely melted and smooth.
5. Set: Pour the ganache into a shallow dish, cover with plastic wrap pressed directly against the surface, and refrigerate for 2 hours.
6. Shape and Roll: Using a spoon or melon baller, scoop small portions of ganache and roll them quickly between your palms. Roll the truffles in cocoa powder and top with a tiny crystal of fleur de sel. Store in a cool place.`
  },
  {
    id: 3,
    title: "Myth Cocoa Signature Sipping Chocolate",
    slug: "myth-cocoa-hot-chocolate",
    excerpt: "Thick, rich, European-style drinking chocolate spiced with a touch of vanilla bean and sea salt.",
    category: "recipes",
    image: "/images/process-final.jpg",
    author: "Liam Chen",
    createdAt: "2026-04-25T10:00:00Z",
    content: `Unlike traditional hot cocoa, which relies on cocoa powder, sipping chocolate is made by melting real chocolate bars directly into milk. The result is an incredibly dense, luxurious drink reminiscent of the chocolate houses of Paris and Turin.

Ingredients:
- 120g Golden Milk Silk or Mythical Dark (depending on your preference)
- 250ml whole grass-fed milk
- 50ml heavy cream
- 1 tsp organic arrowroot starch (optional, for thickness)
- 1/2 vanilla bean, scraped
- A tiny pinch of sea salt and cinnamon

Instructions:
1. Warm the Dairy: In a heavy saucepan, whisk together the milk, cream, scraped vanilla seeds, salt, and cinnamon. Warm over medium-low heat until steaming.
2. Melt the Chocolate: Add the finely chopped chocolate to the hot dairy. Reduce heat to low and whisk continuously until the chocolate is fully melted.
3. Thicken: If you prefer a thick, pudding-like consistency, mix the arrowroot starch with 1 tbsp of cold milk, pour it into the hot chocolate, and cook for 1 minute while whisking until thickened.
4. Serve: Pour into espresso cups. Top with fresh whipped cream or enjoy pure.`
  },

  // PAIRINGS
  {
    id: 4,
    title: "Dark Chocolate & Fine Cabernet Sauvignon",
    slug: "dark-chocolate-wine-pairing",
    excerpt: "Unlocking the complex flavor profiles when single-origin dark chocolate meets rich, full-bodied red wines.",
    category: "pairing",
    image: "/images/journal-pairing.jpg",
    author: "Marcella Vance (Sommelier)",
    createdAt: "2026-05-02T10:00:00Z",
    content: `Pairing red wine and dark chocolate is a delicate art. Both are rich in tannins, which can clash and taste bitter if paired incorrectly. However, when you match a low-sugar, high-fruit chocolate like our Madagascar 75% dark with a fruit-forward Cabernet Sauvignon, the results are sublime.

The Science of Tannins:
Tannins bind to salivary proteins, leaving a drying sensation. To prevent palate fatigue, choose a wine with rounded, velvety tannins and low acidity. 

Tasting Ritual:
1. Take a small sip of wine to prime your palate.
2. Place a small piece of chocolate on your tongue and let it melt slowly without chewing.
3. While the chocolate is melting, take a second sip of wine and let the liquid wash over the chocolate. Note how the dark berry notes of the wine complement the acidity of the cacao.`
  },
  {
    id: 5,
    title: "Single-Origin Cocoa & Specialty Coffee",
    slug: "cacao-coffee-pairing-guide",
    excerpt: "How to match the fruity, earthy notes of heirloom cacao with the acidity and body of light-roast single-origin coffees.",
    category: "pairing",
    image: "/images/journal-farm-day.jpg",
    author: "Hiroshi Tanaka (Q-Grader)",
    createdAt: "2026-05-10T10:00:00Z",
    content: `Coffee and cacao are sister plants. They grow in similar equatorial latitudes, thrive in volcanic soils, and undergo complex fermentation processes. Pairing them is an exploration of shared origins and complementary terroirs.

Recommended Pairings:
- East African Light Roasts (Ethiopia Yirgacheffe) with Madagascar Dark: The jasmine aromas and citrus acidity of the coffee enhance the natural blackberry acidity of the Criollo beans.
- Central American Medium Roasts (Guatemala Antigua) with Milk Silk: The chocolatey, nutty notes of the coffee blend beautifully with the creaminess and sea salt finish of the milk chocolate.
- Indonesian Dark Roasts (Sumatra Mandheling) with 85% Bold Dark: The heavy, earthy, herbal coffee stands up to the intense cacao bitterness and woodsy notes.`
  },
  {
    id: 6,
    title: "Artisanal Cheese & Craft Chocolate",
    slug: "cheese-and-chocolate-pairings",
    excerpt: "An unexpected pairing that delights the palate: pairing sharp white cheddar, blue cheese, and goat cheese with dark and milk bars.",
    category: "pairing",
    image: "/images/product-milk-silk.jpg",
    author: "Marcella Vance (Sommelier)",
    createdAt: "2026-05-18T10:00:00Z",
    content: `Pairing chocolate with cheese might sound unusual, but it operates on the same flavor-bridging principles as wine or beer. The creamy fats of cheese coat the tongue, mitigating chocolate's bitterness, while the salt in cheese elevates the subtle fruit and floral notes in cacao.

Three Perfect Pairs:
1. Goat Cheese & 70% Dark: The tangy, bright creaminess of fresh chèvre cuts through the dark cacao density, highlighting tropical fruit notes.
2. Aged Gouda & Golden Milk Silk: The crystalized tyrosine crunches in aged gouda paired with milk chocolate create a butterscotch and caramel symphony.
3. Blue Cheese & 85% Dark: The intense saltiness and funk of Roquefort or Stilton pair beautifully with ultra-dark chocolate, creating a rich savory-sweet contrast.`
  },

  // ORIGIN STORIES
  {
    id: 7,
    title: "The Foothills Estate Journey",
    slug: "foothills-estate-journey",
    excerpt: "The history of the Myth Cocoa Estate and our commitment to regenerating wild forest cacao varietals.",
    category: "origin",
    image: "/images/farm-aerial.jpg",
    author: "Mateo Silva (Founder)",
    createdAt: "2026-03-01T10:00:00Z",
    content: `Deep in the mountain foothills lies the birthplace of Myth Cocoa. Ten years ago, this land was a depleted monoculture farm. Our vision was to restore the native ecosystem by planting cacao alongside shade-providing banana trees, wild avocados, and native nitrogen-fixing legumes.

By mimicking a natural forest canopy, we created a biodiverse habitat where heirloom cacao varietals thrive. This agroforestry model protects the soil from erosion, preserves local water tables, and allows organic cacao trees to develop deep taproots that absorb complex minerals, resulting in our chocolate's signature mineral undertones.`
  },
  {
    id: 8,
    title: "Preserving Heirloom Criollo in Madagascar",
    slug: "preserving-criollo-madagascar",
    excerpt: "Behind the scenes with our smallholder farming partners in the Sambirano Valley, cultivating the rare Criollo cacao.",
    category: "origin",
    image: "/images/farm-hands-pod.jpg",
    author: "Mateo Silva (Founder)",
    createdAt: "2026-03-12T10:00:00Z",
    content: `Madagascar's Sambirano Valley is famous for its bright, fruity cacao. However, the rare Criollo tree—responsible for the world's most delicate, white-bean chocolate—is highly susceptible to disease and is increasingly replaced by high-yield hybrids.

Myth Cocoa collaborates with cooperative farmers in Madagascar to preserve these historic trees. We pay a 60% premium above Fairtrade prices to support organic farming, hand-harvesting, and precise box fermentation. This direct relationship ensures the survival of heirloom genetics and guarantees a sustainable livelihood for the farming families.`
  },
  {
    id: 9,
    title: "Guardians of the Amazonian Forest",
    slug: "guardians-amazon-cacao",
    excerpt: "Meeting the indigenous communities preserving wild, uncultivated cacao trees deep within the Ecuadorian rainforest.",
    category: "origin",
    image: "/images/farmer-portrait.jpg",
    author: "Elena Rostov",
    createdAt: "2026-03-22T10:00:00Z",
    content: `In the Ecuadorian Amazon, cacao grows wild. Known locally as 'Nacional', these ancient trees are harvested by indigenous Kichwa communities who navigate deep rivers to gather wild pods.

We partner with these communities, respecting their traditional land stewardship. By processing this wild cacao in small batches at origin, we retain the subtle herbal and floral notes that cannot be replicated in cultivated varieties. Every bar purchased directly supports the Kichwa's efforts to defend their ancestral lands from deforestation.`
  },

  // CRAFT & PROCESS
  {
    id: 10,
    title: "The Alchemy of Fermentation",
    slug: "alchemy-cacao-fermentation",
    excerpt: "Why the first six days after harvest dictate up to 80% of a chocolate bar's final flavor profile.",
    category: "craft",
    image: "/images/process-fermentation.jpg",
    author: "Dr. Clara Mendoza (Cacao Biologist)",
    createdAt: "2026-02-05T10:00:00Z",
    content: `Cacao beans straight out of the pod do not taste like chocolate; they are bitter, astringent, and surrounded by sweet white pulp. The magic happens during fermentation.

For six days, the pulp's sugars are converted by wild yeasts into alcohol, and then by bacteria into acetic acid. This raise in temperature (up to 50°C) breaks down the bean's cell walls, triggering chemical reactions that create the precursor compounds of chocolate flavor. Our estate uses custom wooden boxes covered with banana leaves to ensure a perfect temperature curve.`
  },
  {
    id: 11,
    title: "Patience in the Conche",
    slug: "patience-in-cacao-conching",
    excerpt: "How long, slow aeration transforms gritty cocoa mass into the silky, round-textured chocolate we love.",
    category: "craft",
    image: "/images/process-conching.jpg",
    author: "Liam Chen",
    createdAt: "2026-02-14T10:00:00Z",
    content: `Conching was invented accidentally by Rodolphe Lindt in 1879. By leaving a chocolate mixing machine running over a weekend, he discovered that continuous agitation and warmth developed a velvety texture and mellowed the cacao's harsh acids.

At Myth Cocoa, we conch our chocolate for up to 72 hours. This process volatilizes unwanted compounds like acetic acid and coats every tiny sugar and cacao particle in smooth cocoa butter. It requires immense patience, but it is the only way to achieve our signature silky mouthfeel.`
  },
  {
    id: 12,
    title: "The Art of Tempering",
    slug: "art-of-tempering-chocolate",
    excerpt: "A deep dive into beta crystal formation, achieving the perfect glossy shine and satisfying snap.",
    category: "craft",
    image: "/images/process-tempering.jpg",
    author: "Antoine Laurent",
    createdAt: "2026-02-25T10:00:00Z",
    content: `Tempering is the science of crystallization. Cocoa butter is polymorphic, meaning it can solidify into six different crystal forms. Only Form V (Beta crystals) provides chocolate with a glossy shine, a crisp snap, and stability at room temperature.

We heat our chocolate to melt all crystal structures, cool it slowly to seed stable crystals, and then raise the temperature slightly to melt away unstable forms. Hand-tempering on a marble slab remains the ultimate test of a chocolatier's skill, requiring precision to the tenth of a degree.`
  },

  // EDUCATION
  {
    id: 13,
    title: "Understanding Cacao Percentages",
    slug: "understanding-cacao-percentages",
    excerpt: "What does '70% Dark' actually mean? Demystifying cocoa solids, cocoa butter, and sugar content.",
    category: "education",
    image: "/images/process-final.jpg",
    author: "Liam Chen",
    createdAt: "2026-01-10T10:00:00Z",
    content: `When you see a percentage on a chocolate bar, it refers to the total weight of the bar derived from cacao beans. For example, a 70% bar contains 70% cacao and 30% sugar.

However, that 70% is a combination of two elements: cocoa solids (which provide the intense color and flavor) and cocoa butter (which provides the rich melt). Two different 70% bars can have completely different textures and flavors depending on the ratio of solids to butter. We keep our ratios balanced to highlight terroir without compromising mouthfeel.`
  },
  {
    id: 14,
    title: "How to Taste Chocolate Like a Sommelier",
    slug: "how-to-taste-chocolate-like-sommelier",
    excerpt: "A guide to engaging all five senses to identify notes of red fruit, tobacco, honey, and spice in single-origin bars.",
    category: "education",
    image: "/images/journal-pairing.jpg",
    author: "Marcella Vance (Sommelier)",
    createdAt: "2026-01-20T10:00:00Z",
    content: `Tasting fine chocolate is an active, sensory experience. Like fine wine or coffee, cacao contains over 600 volatile flavor compounds that reveal themselves in stages.

Step 1: Look. The surface should be glossy and free of grey streaks (bloom).
Step 2: Listen. Snap the bar near your ear. A clean snap indicates perfect tempering.
Step 3: Smell. Rub the bar to warm it, and inhale the aromas.
Step 4: Melt. Place a piece on your tongue. Do not chew. Let it melt, circulating air in your mouth to release notes of red berries, honey, and oak.`
  },
  {
    id: 15,
    title: "The Health Benefits of Flavanols",
    slug: "health-benefits-cacao-flavanols",
    excerpt: "Separating fact from fiction: the cardiovascular and cognitive benefits of consuming raw and dark cacao.",
    category: "education",
    image: "/images/story-team.jpg",
    author: "Dr. Clara Mendoza (Cacao Biologist)",
    createdAt: "2026-01-30T10:00:00Z",
    content: `Cacao has been revered as the 'food of the gods' for centuries. Modern science confirms its power. Cacao beans are packed with flavanols, a class of plant nutrients with powerful antioxidant properties.

Research shows that flavanols stimulate the production of nitric oxide, which relaxes blood vessels and improves blood flow to the brain and heart. To maximize health benefits, choose dark chocolate above 70% with minimal processing, as heavy alkalization (Dutching) destroys up to 90% of these beneficial compounds.`
  }
];
