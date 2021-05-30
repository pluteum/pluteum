# Monocle

The Monocle service is a worker responsible for parsing eBook files to search for identifiers, fetching book information based on identifiers and fetching or generating an image to serve as the cover image for a given book.

Monocle is currently mostly a wrapper around ebook-tools, which provides most of the parsing and fetching capabilities that we need.

## Components

### Parsing

Monocle parses eBook files for their ISBN using ebook-tools, this is currently just a very light wrapper around the ./find-isbn.sh file in ebook-tools, see parsing/index.ts for more details.
