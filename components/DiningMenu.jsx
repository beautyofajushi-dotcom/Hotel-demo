'use client';

import { useState } from 'react';

const categories = {
  mughlai: {
    label: 'Mughlai signatures',
    note: 'A vegetarian reading of Agra’s generous Mughlai table.',
    items: [
      { name: 'Subz Dum Biryani', detail: 'Seasonal vegetables, aged basmati, saffron and crisp onions', price: '₹1,250', tags: ['PURE VEG', 'JAIN ON REQUEST'] },
      { name: 'Paneer-e-Mirāan', detail: 'Soft paneer, smoked tomato, whole spices and warm roomali roti', price: '₹1,180', tags: ['PURE VEG'] },
      { name: 'Dum Aloo Agra', detail: 'Baby potatoes, slow-cooked gravy, fresh coriander', price: '₹890', tags: ['PURE VEG', 'JAIN OPTION'] },
      { name: 'Petha & Rabri', detail: 'Local petha, chilled rabri, pistachio dust', price: '₹590', tags: ['PURE VEG'] },
    ],
  },
  garden: {
    label: 'From the garden',
    note: 'Lighter plates led by the season, the market and the kitchen garden.',
    items: [
      { name: 'Jali Garden Salad', detail: 'Baby leaves, citrus, toasted seeds and green chutney dressing', price: '₹760', tags: ['PURE VEG', 'SEASONAL'] },
      { name: 'Palak & Paneer', detail: 'Fresh spinach, house paneer, ginger and a little cream', price: '₹980', tags: ['PURE VEG', 'JAIN ON REQUEST'] },
      { name: 'Dal Mirāan', detail: 'Black lentils, slow simmered overnight, finished with cultured butter', price: '₹890', tags: ['PURE VEG'] },
      { name: 'Tandoor Vegetables', detail: 'Market vegetables, hung yoghurt, mint and toasted cumin', price: '₹940', tags: ['PURE VEG', 'JAIN OPTION'] },
    ],
  },
  tea: {
    label: 'Tea in the courtyard',
    note: 'An afternoon with a pot of chai and a little something sweet.',
    items: [
      { name: 'Masala Chai & Agra Petha', detail: 'House spice blend, ginger tea and a tasting of local petha', price: '₹650', tags: ['PURE VEG'] },
      { name: 'Taj Garden High Tea', detail: 'Petite sandwiches, savouries, seasonal tart and two teas', price: '₹1,850', tags: ['PURE VEG', 'SEASONAL'] },
      { name: 'Saffron Kulfi', detail: 'Slow-set milk, saffron, pistachio and rose', price: '₹520', tags: ['PURE VEG'] },
    ],
  },
};

function DietaryTags({ tags }) {
  return <div className="diet-tags">{tags.map((tag) => <span key={tag}><i className={`green-dot ${tag.includes('JAIN') ? 'jain-dot' : tag === 'SEASONAL' ? 'organic-dot' : ''}`} />{tag}</span>)}</div>;
}

export default function DiningMenu() {
  const [active, setActive] = useState('mughlai');
  const keys = Object.keys(categories);
  const keydown = (event, index) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? keys.length - 1 : event.key === 'ArrowRight' ? (index + 1) % keys.length : (index - 1 + keys.length) % keys.length;
    setActive(keys[next]);
    document.getElementById(`menu-tab-${keys[next]}`)?.focus();
  };
  const menu = categories[active];

  return (
    <div className="dark-band p-6 sm:p-9 lg:p-12" data-reveal>
      <div className="menu-tabs" role="tablist" aria-label="Dining menu categories">
        {keys.map((key, index) => <button className={`menu-tab ${active === key ? 'is-active' : ''}`} type="button" role="tab" id={`menu-tab-${key}`} aria-selected={active === key} aria-controls={`menu-panel-${key}`} tabIndex={active === key ? 0 : -1} key={key} onClick={() => setActive(key)} onKeyDown={(event) => keydown(event, index)}>{categories[key].label}<span>0{index + 1}</span></button>)}
      </div>
      <section className="menu-panel" role="tabpanel" id={`menu-panel-${active}`} aria-labelledby={`menu-tab-${active}`} key={active}>
        <div className="menu-panel-head"><span>{active.toUpperCase()} · A TABLE FOR EVERYONE</span><p>{menu.note}</p></div>
        <div className="menu-items">{menu.items.map((item) => <article className="menu-item" key={item.name}><div><h3>{item.name}</h3><p>{item.detail}</p><DietaryTags tags={item.tags} /></div><strong>{item.price}</strong></article>)}</div>
      </section>
      <p className="menu-note">All dishes are vegetarian. Jain preparations are available with advance notice. Example prices in INR; seasonal menus and taxes may vary.</p>
    </div>
  );
}
