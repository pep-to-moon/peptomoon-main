# Search Console data for the reach section

The "Search reach" section on the home page and the case studies page shows real figures from Google Search Console.
It stays empty until an export is added here, and it never shows a number that Search Console did not report.

## How to add a store

1. Open Search Console for the site and go to **Performance, Search results**. Choose the date range to show.
2. Click **Export, Download Excel** (or CSV).
3. Make a folder here with any neutral name, for example `data/gsc/store-1/`, and drop the file in it.
   - Excel: the `.xlsx` file as downloaded. The importer reads its Chart, Countries and Devices sheets.
   - CSV: `Dates.csv` (or `Chart.csv`), plus optionally `Countries.csv` and `Devices.csv`.
4. Run `pnpm import:gsc`. It rewrites `src/content/gsc-data.ts`.
5. Rebuild the site.

## What is published, and what is not

- Stores appear as "Store 1", "Store 2" and so on, in folder order. No site name, domain or folder name is written to
  the generated file, so a store cannot be identified from it.
- Published: total clicks and impressions, average CTR and position, a weekly chart, the top countries by clicks and the
  device split.
- Never published: individual search queries and pages. Queries often contain product and usage terms that do not belong
  on the site, so the importer does not read them at all.
- Each figure is shown with its date range and export date, so it stays honest as it ages. Re-export and re-import to refresh.
