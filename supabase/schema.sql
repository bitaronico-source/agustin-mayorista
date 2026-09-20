-- Schema de productos para el panel de administración.
-- Ejecutá esto en el SQL Editor de tu proyecto Supabase (Dashboard > SQL).

create table if not exists public.products (
  id          text primary key,
  name        text not null,
  category    text not null,
  price       numeric not null,
  price_minor numeric,
  stock       integer not null default 0,
  image       text not null,
  badge       text,
  featured    boolean not null default false,
  preorder    boolean not null default false,
  description text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_featured_idx on public.products (featured) where featured = true;

-- La app escribe solo desde el server con la service role key, que ignora RLS.
-- Igual habilitamos RLS y permitimos lectura pública por si querés consultar desde el cliente.
alter table public.products enable row level security;

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products
  for select using (true);

drop policy if exists "products_admin_write" on public.products;
create policy "products_admin_write" on public.products
  for all using (true) with check (true);

-- Bucket público para las imágenes de productos.
insert into storage.buckets (id, name, public, file_size_limit)
values ('productos', 'productos', true, 5242880)
on conflict (id) do nothing;

drop policy if exists "product_images_public_read" on storage.objects;
create policy "product_images_public_read" on storage.objects
  for select using (bucket_id = 'productos');

drop policy if exists "product_images_admin_write" on storage.objects;
create policy "product_images_admin_write" on storage.objects
  for all using (bucket_id = 'productos') with check (bucket_id = 'productos');