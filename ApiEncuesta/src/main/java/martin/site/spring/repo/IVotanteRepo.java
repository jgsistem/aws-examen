package martin.site.spring.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import martin.site.spring.model.Votante;


public interface IVotanteRepo extends JpaRepository<Votante, Integer> {

}
