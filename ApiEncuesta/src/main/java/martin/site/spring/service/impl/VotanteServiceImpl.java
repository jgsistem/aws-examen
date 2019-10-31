package martin.site.spring.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import martin.site.spring.model.Votante;
import martin.site.spring.repo.IVotanteRepo;
import martin.site.spring.service.IVotanteService;

@Service
public class VotanteServiceImpl implements IVotanteService {

	@Autowired
	private IVotanteRepo repo;
	@Override
	public Votante registrar(Votante t) {
		// TODO Auto-generated method stub
		return repo.save(t);
	}

	@Override
	public Votante modificar(Votante t) {
		// TODO Auto-generated method stub
		return repo.save(t);
	}

	@Override
	public List<Votante> listar() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public Votante leer(Integer id) {
		// TODO Auto-generated method stub
		Optional<Votante> op = repo.findById(id);
		return op.isPresent() ? op.get() : new Votante();
	}

	@Override
	public void eliminar(Integer id) {
		// TODO Auto-generated method stub
		repo.deleteById(id);
	}

}
