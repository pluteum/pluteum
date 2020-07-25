import React from 'react';
import styled from 'styled-components';

import BookCover from 'components/BookCover';
import Rating from 'components/form/Rating';
import Tags from 'components/form/Tags';

const Layout = styled.div`
    padding: 10px;

    > div:first-child {
        float: left;
        width: 100px;

        margin-right: 15px;
    }

    @media (min-width: 768px) {
        display: grid;

        max-width: 1040px;
        margin: 40px auto;

        grid-template-columns: 1fr 2fr;
        grid-column-gap: 64px;

        > div:first-child {
            float: none;
            width: auto;

            margin-right: unset;
        }    
    }
`;

const TitleLayout = styled.div`
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (min-width: 768px) {
      height: unset;
      margin-bottom: 35px;
    }
`;

const DetailsLayout = styled.div`

`;

const MetaLayout = styled.div`
    padding-top: 10px;
    margin-top: 20px;

    border-top: 1px solid ${props => props.theme.colors.lightGrey};

    @media (min-width: 768px) {
        margin-top: 40px;
        padding-top: 20px;
    }
`;

const FieldGroup = styled.div`

`;

export const BookTitle = styled.h1`
  font-family: ${props => props.theme.type.display_serif};
  font-weight: normal;
  font-size: 48px;
  line-height: auto;
  color: ${props => props.theme.colors.black};
  margin: 0;

  @media (min-width: 768px) {
    font-size: 76px;
    line-height: 80px;
    margin: 0
  }
`;

export const Author = styled.p`
  font-family: ${props => props.theme.type.mono};
  font-weight: 300;
  font-size: 14px;
  line-height: 22px;
  color: ${props => props.theme.colors.darkGrey};
  margin: 0;
  margin-bottom: 0 0 15px;

  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 22px;
    margin: 15px 0 25px;
  }
`;

export const Description = styled.p`
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: ${props => props.theme.colors.darkGrey};
  margin: 19px 0 25px;

  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 32px
  }
`;

export const MetaHeader = styled.h2`
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: ${props => props.theme.colors.darkGrey};
`;

export const FieldHeader = styled.p`
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: ${props => props.theme.colors.darkGrey};
`;

export const FieldContent = styled.p`
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: ${props => props.theme.colors.darkGrey};
`;

export default function BookDetails({ book, onRating, onNewTag, onDeleteTag }) {
  const authorString = !!book.author ? book.author.map((a) => a.name).join(', ') : '';
  const tags = !!book.tags ? book.tags.map((t) => t.name) : [];

  return (
    <Layout>
        <div>
            <BookCover title={book?.title} author={authorString} />
        </div>
        <DetailsLayout>
            <TitleLayout>
                <BookTitle>{book?.title}</BookTitle>
                <Author>by {authorString}</Author>
                <Rating rating={book?.rating} onRating={onRating} />
            </TitleLayout>
            <Description>{book?.description}</Description>
            <FieldHeader>Tags</FieldHeader>
            <Tags tags={tags} onNewTag={onNewTag} onDeleteTag={onDeleteTag} editable={false} />
            <MetaLayout>
                <MetaHeader>Information</MetaHeader>
                <FieldGroup>
                    <FieldHeader>Series</FieldHeader>
                    <FieldContent>N / A</FieldContent>
                </FieldGroup>
            </MetaLayout>
        </DetailsLayout>
    </Layout>
  );
}
