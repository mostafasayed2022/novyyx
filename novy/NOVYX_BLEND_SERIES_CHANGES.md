# NOVYX Blend Series update

- Added 16 peptide blend products as persistent database records.
- Removed the generated Blend Series product artwork from `public/`.
- Blend seed records use an empty `imageUrl`; final images can be uploaded later from the admin dashboard through Cloudinary.
- Added database migration version 4 so existing local/Turso stores receive missing blend records without overwriting dashboard-edited products.
- Old local `/products/blends/*` image paths are cleared while Cloudinary/external image URLs are preserved.
- Catalog navigation remains limited to Peptides and Skin Boosters.
