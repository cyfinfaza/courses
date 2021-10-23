import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

export default function Head({ title, description, author }) {
	const metadata = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
					}
				}
			}
		`
	);
	const formattedTitle =
		metadata.site.siteMetadata.title + (title ? " - " + title : "");
	return (
		<Helmet
			title={formattedTitle}
			meta={[
				{
					name: `description`,
					content: description || metadata.site.siteMetadata.description,
				},
				{
					property: `og:title`,
					content: formattedTitle,
				},
				{
					property: `og:description`,
					content: description || metadata.site.siteMetadata.description,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:title`,
					content: formattedTitle,
				},
				{
					name: `twitter:description`,
					content: description || metadata.site.siteMetadata.description,
				},
			]}
		/>
	);
}
