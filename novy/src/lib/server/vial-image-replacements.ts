// One-time replacement for the original Cloudinary vial renders that had pack counts printed on their labels.
// Match exact source URLs so later dashboard uploads stay untouched.
export const VIAL_IMAGE_REPLACEMENTS: Record<string, string> = {
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1791390430/novyx/products/bmwr1wvan2q7o0o18tww.webp": "/products/novyx_cutis_box_vial.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792001554/novyx/products/a6hfk9xbtjrjjmpyx8bx.png": "/products/clean-vials/nx-blend-frag-modgrf-ipa.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792001623/novyx/products/vjp8brpvea4lqdwts6sd.png": "/products/clean-vials/nx-blend-bpc-tb500.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792001695/novyx/products/jpatytofbfp583htxmlz.png": "/products/clean-vials/nx-blend-cjc-ghrp6.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792001749/novyx/products/rtudalirzyib7pnjixgd.png": "/products/clean-vials/nx-blend-cjc-ipa.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792001795/novyx/products/cjtopoixbwghpyl7e6tf.png": "/products/clean-vials/nx-blend-cjc-ipa-ghrp2.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792001841/novyx/products/p7whotu8zg8j1a8x5nvg.png": "/products/clean-vials/nx-blend-frag-cjc-ipa.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792002073/novyx/products/jqqqykllcgpz7kzwouvi.png": "/products/clean-vials/nx-blend-modgrf-ghrp2.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792002116/novyx/products/q6jynvqqpdymbwwtolc6.png": "/products/clean-vials/nx-blend-modgrf-ipa.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792002149/novyx/products/gfhvv8tmlkwhqdhgn3it.png": "/products/clean-vials/nx-blend-sermorelin-ipa.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792002192/novyx/products/sgpenvudl4c7gdhov15w.png": "/products/clean-vials/nx-blend-modgrf-ghrp6.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792002232/novyx/products/g569pkimics7un5ce7yl.png": "/products/clean-vials/nx-blend-cjc-ghrp2.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792002316/novyx/products/w798kn3wkx71rzlbfcpz.png": "/products/clean-vials/nx-blend-tesa-cjc-ipa.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792002395/novyx/products/rm8lurjzbdna3ydyvx5j.png": "/products/clean-vials/nx-blend-tesa-ipa.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792002465/novyx/products/xq1hi0dycogjr3p1zmyy.png": "/products/clean-vials/nx-blend-bpc-tb500-ghk.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792002525/novyx/products/ledpncuenj16kaet6rqh.png": "/products/clean-vials/nx-blend-sermorelin-ghrp6-ghrp2.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792002605/novyx/products/ojlwjqmyna1a64imytb3.png": "/products/clean-vials/nx-blend-klow.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792002686/novyx/products/jibvx6kxmiumtqit5xak.png": "/products/clean-vials/0266b8f6-e4ff-4436-9eb6-d5262dbce36b.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792002770/novyx/products/chjq1ejyathbw7opzf08.png": "/products/clean-vials/b4b361c2-6838-4bb3-956b-d811a11b1ae5.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792002850/novyx/products/ej6wsyzfepbubaxnnhl9.png": "/products/clean-vials/80210c08-a1fc-43a5-9258-8cd70f94056b.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792002919/novyx/products/bem4pc2uvyji5e1hdyjs.png": "/products/clean-vials/1008b6b5-9ab6-4079-8ae4-518988b01661.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792003008/novyx/products/ldwcqjw1sbaauesenqqw.png": "/products/clean-vials/762b1873-66bc-40dd-bfd1-afa5b8c7010a.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792003083/novyx/products/jiue4oywtilxdwufmmgk.png": "/products/clean-vials/17de150b-2ad9-43c7-810d-cd1d81a71ddb.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792003134/novyx/products/qwvsx3tsa9eciy1urnwu.png": "/products/clean-vials/b21d579b-e3db-4fd9-8f81-4fcb98a2731b.webp",
  "https://res.cloudinary.com/ygpkjbpn/image/upload/v1792003217/novyx/products/xlho5pw53hs14ojxmakq.png": "/products/clean-vials/2e1032b2-d347-408d-9a65-6da821538f1c.webp"
};
