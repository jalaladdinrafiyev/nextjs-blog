import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '../../lib/posts-util';

function PostDetailPage(props) {
	return <PostContent post={props.post}/>;
}

export async function getStaticProps(context) {
	const { params } = context;

	const postData = getPostData(params.slug);

	return {
		props: {
			post: postData
		},
		revalidate: 600
	};
}

export async function getStaticPaths() {
	const postFilenames = getPostsFiles();

	const slugs = postFilenames.map(fileName =>
		fileName.replace(/\.md$/, '')
	);

	return {
		paths: slugs.map(slug => ({ params: { slug: slug } })),
    fallback: false
	};
}

export default PostDetailPage;
