package martin.site.spring.service;

import martin.site.spring.dto.RenewPasswordFirstDTO;
import martin.site.spring.dto.RespuestaApi;
import martin.site.spring.dto.UpdatePasswordDTO;

public interface SecurityService {

	public RespuestaApi getToken(String username, String password);
	public RespuestaApi resetNewPasswordFirst(RenewPasswordFirstDTO updatePassword);
	public RespuestaApi updatePassword(UpdatePasswordDTO updatePassword);
	public RespuestaApi signOut(String token);
	public RespuestaApi refreshToken(String token);
}
