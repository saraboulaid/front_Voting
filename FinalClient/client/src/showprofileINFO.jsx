import { FaUserAlt } from "react-icons/fa";
function ShowprofileINFO(props)
{
    return(<>
    
    <div className='top_change_profil'>
            <img src={props.userData.img} alt="pic" id='profil_modif' />
          </div>
          <div className='profile_Name_modify'>
            <div>
              <FaUserAlt style={{ "marginTop": "10px", "color": "rgb(133, 75, 133)" }} />
            </div>
            <div id='bottom_profil_modify'>
              <div>
                <div className='Nom_utilisateur'>Nom</div>
              </div>
              <div>
                <input type="text" value={props.userData.username} />
              </div>
              <div className='modification_info'>
                Ce nom d'utilisateur correspond au nom d'utilisateur de domaine ainsi tout modification du nom l'administrateur sera informe.
              </div>
            </div>
          </div>
    </>)
}

export default ShowprofileINFO