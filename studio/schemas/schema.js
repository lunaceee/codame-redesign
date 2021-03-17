// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import blockContent from "./objects/blockContent";
import category from "./documents/category";
import post from "./documents/post";
import contentImage from "./objects/contentImage";
import author from "./documents/author";
import artist from "./documents/artist";
import page from "./documents/page";
import gallery from "./objects/gallery";
import button from "./objects/CTAbutton";
import partner from "./documents/partner";
import sponsor from "./documents/sponsor";
import event from "./documents/event";
import project from "./documents/project";
import collection from "./documents/collection";
import contact from "./documents/contact";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    page,
    post,
    contentImage,
    author,
    gallery,
    category,
    artist,
    event,
    project,
    collection,
    partner,
    sponsor,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    button,
    contact,
  ]),
});
