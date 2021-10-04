//
import { getPersonIds, getPersonData } from '../../lib/persons';

// a next.js app that uses dynamic paths requires getStaticPaths()
export async function getStaticPaths(){
  const paths = await getPersonIds();
  return {
    paths,
    fallback:  false
  };
}

// a next.js app that uses dynamic paths requires getStaticProps()
export async function getStaticProps( {params} ){
  const itemData = await getPersonData(params.id);
  return {
    props: {
      itemData
    }
  };
}

export default function Entry ( {itemData} ){

return (
    <article className="card col-6">
      <div className="card-body">
        <h5 className="card-title">{itemData.data.name}</h5>
        <p className="card-text">Also Known as: {itemData.data.aka}</p>
        <p className="card-text">{itemData.data.birthdate}</p>

        {itemData.data.email ?
          <a className="btn btn-primary" href={'mailto:' + itemData.data.email}>Email: {itemData.data.email}</a>
          : null
        }
      </div>
    </article>
  );
}