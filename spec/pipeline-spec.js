'use babel';

import Pipeline from '../lib/pipeline';

describe('Pipeline', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('pipeline');
  });

  describe('when the pipeline:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      expect(workspaceElement.querySelector('.pipeline')).not.toExist();

      atom.commands.dispatch(workspaceElement, 'pipeline:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.pipeline')).toExist();

        let pipelineElement = workspaceElement.querySelector('.pipeline');
        expect(pipelineElement).toExist();

        let pipelinePanel = atom.workspace.panelForItem(pipelineElement);
        expect(pipelinePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'pipeline:toggle');
        expect(pipelinePanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.pipeline')).not.toExist();
      atom.commands.dispatch(workspaceElement, 'pipeline:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });
      runs(() => {
        let pipelineElement = workspaceElement.querySelector('.pipeline');
        expect(pipelineElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'pipeline:toggle');
        expect(pipelineElement).not.toBeVisible();
      });
    });
  });
});
